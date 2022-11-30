import { Injectable } from '@nestjs/common';

import * as AWS from 'aws-sdk';
import * as crypto from 'crypto';
import { v4 as uuidv4 } from 'uuid'
import { hashPassword } from '../utils/hashPassword';
import { createUser } from 'src/database/repository/user.repository';

@Injectable()
export class AuthService {

private config = {
    region: process.env.REGION,
};

private secretHash = process.env.COGNITO_SECRET;
private clientId = process.env.COGNITO_CLIENT_ID;

private cognitoService = new AWS.CognitoIdentityServiceProvider(this.config);

private generateHash = (username: string): string => {
    return crypto.createHmac('SHA256', this.secretHash)
      .update(username + this.clientId)
      .digest('base64')
}

async registerUser(username:string, password:string, userAttr:Array<any>) {
    const params = {
    ClientId: this.clientId,
    Password: password,
    Username: username,
    SecretHash: this.generateHash(username),
    UserAttributes: userAttr,
  }

  const id = uuidv4()

    try {
    const email: string = userAttr[0].Value;
    const hashedPassword: string  = await hashPassword(password)

    const user = await createUser({id, username, password: hashedPassword, email})
    console.log(user);

    const cognitoResponse = await this.cognitoService.signUp(params).promise();
    console.log(`Created cognito user:
    username: ${username},
    email: ${email},
    message: ${cognitoResponse.$response}`);
  } catch (error) {
    console.log(`Error occurred: ${error}`);
  };

}

async loginUser(username:string, password:string) {
    const params = {
    AuthFlow: 'USER_PASSWORD_AUTH',
    ClientId: this.clientId,
    AuthParameters: {
      'USERNAME': username,
      'PASSWORD': password,
      "SECRET_HASH": this.generateHash(username)
    }
  } 

  try {
    const data = await this.cognitoService.initiateAuth(params).promise()
    return data
  } catch (error) {
    console.log(error);
    return 'Login unsuccessful'
  }
}
}