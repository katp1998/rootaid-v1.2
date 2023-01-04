import { Inject, Injectable } from '@nestjs/common';
import { AuthConfig } from './auth.config';
import {
  AuthenticationDetails,
  CognitoUser,
  CognitoUserPool,
} from 'amazon-cognito-identity-js';
import * as AWS from 'aws-sdk';
import * as crypto from 'crypto';
import { createUser, saveRefreshToken, findUser, findUserByToken, removeRefreshToken } from '../database/repository/user.repository';
import { hashPassword } from '../utils/hashPassword';

@Injectable()
export class AuthService {
  private userPool: CognitoUserPool;

    constructor(
    private readonly authConfig: AuthConfig,
  ) {
    this.userPool = new CognitoUserPool({
      UserPoolId: this.authConfig.userPoolId,
      ClientId: this.authConfig.clientId,
    });
  }

private config = {
    region: 'ap-south-1',
};

private secretHash = '18fibfkk786p3bupviqr7ta8p332ia5a6d2r9clmcqi8qjgvnfkl';
private clientId = '3mrht2qteq3ipv1o56v5s5c1a6';

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

    try {
    const email: string = userAttr[0].Value;
    const hashedPassword: string  = await hashPassword(password)
    const dbResponse = await createUser({username, email , password: hashedPassword});
    console.log(`Created database entry: 
    username: ${username},
    email: ${email},
    message: ${dbResponse}`);

    // const cognitoResponse = await this.cognitoService.signUp(params).promise();
    // console.log(`Created cognito user:
    // username: ${username},
    // email: ${email},
    // message: ${cognitoResponse.$response}`);
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
    const refreshToken = data.AuthenticationResult.RefreshToken as string

    const existingUser = await findUser(username)
    console.log(existingUser)
    await saveRefreshToken(existingUser._id, refreshToken)

    return refreshToken
  } catch (error) {
    console.log(error);
    return 'Login unsuccessful'
  }
}

async verifyRefreshToken(refreshToken:string) {
  
  try {
    const existingUser = await findUserByToken(refreshToken)
    console.log(existingUser)
    const params = {
      AuthFlow: 'REFRESH_TOKEN_AUTH',
      ClientId: this.clientId,
      AuthParameters: {
        'REFRESH_TOKEN': refreshToken,
        "SECRET_HASH": this.generateHash(existingUser.username)
      }
    }
    const data = await this.cognitoService.initiateAuth(params).promise()
    return data
  } catch (error) {
    console.log(error);
    return 'Refresh token not accepted'
  }
}

async logoutUser(refreshToken: string) {
  try {

    const getAccessToken = await this.verifyRefreshToken(refreshToken)

    //Removes refresh token from Dynamodb
    await removeRefreshToken(refreshToken)

    const params = {
    AccessToken: getAccessToken as string,
    }

    const cognitoResult = await this.cognitoService.globalSignOut(params)
    console.log("Successful logout")
    return cognitoResult
  } catch (error) {
    console.log(error)
  }
  
}
async getHello() {
  return `This is a protected route`
}

}