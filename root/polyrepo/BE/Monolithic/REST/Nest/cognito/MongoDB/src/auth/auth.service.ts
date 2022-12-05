<<<<<<< HEAD
import { Injectable } from "@nestjs/common";

import * as AWS from 'aws-sdk'
import * as crypto from 'crypto'
=======
import { Injectable } from '@nestjs/common';

import * as AWS from 'aws-sdk';
import * as crypto from 'crypto';
import { createUser } from '../database/repository/user.repository';
import { hashPassword } from 'src/utils/hashPassword';
>>>>>>> 08d9adf003fb816f4599d822e7cfa23df32d78d2

@Injectable()
export class AuthService {

private config = {
<<<<<<< HEAD
    region: 'us-east-1'
}

private secretHash = '1ofv95uvqt9knp7vsg7g3ark5k192g46qt73iur43mat30604u0c'
private clientId = '51qtvnblrch9vm6cbhgfaj37sl'

private cognitoService = new AWS.CognitoIdentityServiceProvider(this.config)
=======
    region: 'us-east-1',
};

private secretHash = '1ofv95uvqt9knp7vsg7g3ark5k192g46qt73iur43mat30604u0c';
private clientId = '51qtvnblrch9vm6cbhgfaj37sl';

private cognitoService = new AWS.CognitoIdentityServiceProvider(this.config);
>>>>>>> 08d9adf003fb816f4599d822e7cfa23df32d78d2

private generateHash = (username: string): string => {
    return crypto.createHmac('SHA256', this.secretHash)
      .update(username + this.clientId)
      .digest('base64')
}

<<<<<<< HEAD
async register(username:string, password:string, userAttr:Array<any>) {
=======
async registerUser(username:string, password:string, userAttr:Array<any>) {
>>>>>>> 08d9adf003fb816f4599d822e7cfa23df32d78d2
    const params = {
    ClientId: this.clientId,
    Password: password,
    Username: username,
    SecretHash: this.generateHash(username),
<<<<<<< HEAD
    UserAttributes: userAttr
  }

  try {
    const data = await this.cognitoService.signUp(params).promise()
    console.log(data);
    return `Registration successful: ${username}`
  } catch (error) {
    console.log(error);
    return 'Registration failed'
  }
}

async login(username:string, password:string) {
=======
    UserAttributes: userAttr,
  }

    try {
    const email: string = userAttr[0].Value;
    const hashedPassword: string  = await hashPassword(password)
    const dbResponse = await createUser({name: username, email , password: hashedPassword});
    console.log(`Created database entry: 
    username: ${username},
    email: ${email},
    message: ${dbResponse}`);

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
>>>>>>> 08d9adf003fb816f4599d822e7cfa23df32d78d2
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