import { HttpStatus, Injectable } from '@nestjs/common';

import * as AWS from 'aws-sdk';
import * as crypto from 'crypto';
// import { createUser } from '../database/repository/user.repository';
import { hashPassword } from 'src/utils/hashPassword';
import { UserRepository } from '../database/repository/user.repository';
// import { CreateUserDto, UpdateUserDto } from 'src/database/dto';

@Injectable()
export class AuthService {
constructor(private readonly repository: UserRepository) {}

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



    try {
    const email: string = userAttr[0].Value;
    const hashedPassword: string  = await hashPassword(password)
    // const dbResponse = await createUser({name: username, email , password: hashedPassword});

    const userDto = {
      username: username,
      password: hashedPassword,
      email: email,
      refreshToken: ''
    }
    const dbResponse = await this.repository.createUser(userDto)
    console.log(`Created database entry: 
    id: ${dbResponse._id}
    username: ${username},
    email: ${email},
    refresh token: ${dbResponse.refreshToken}`);

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
    const refreshToken = data.AuthenticationResult.RefreshToken.toString()
    console.log(refreshToken)

    const existingUser = await this.repository.findUser(username)
    console.log(existingUser)
    const id = existingUser._id.toString()
    await this.repository.saveRefreshToken(id, {refreshToken: refreshToken})
    return refreshToken

  } catch (error) {
    console.log(error);
    return 'Login unsuccessful'
  }
}

async verifyRefreshToken(refreshToken:string) {
  
  try {
    const existingUser = await this.repository.findUserByToken(refreshToken)
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
    return 'Verification of refresh token failed'
  }
}

async logoutUser(refreshToken: string) {
  try {

    const getAccessToken = await this.verifyRefreshToken(refreshToken)

    //Removes refresh token from MongoDB
    const getUserDetails = await this.repository.findUserByToken(refreshToken)
    const id = getUserDetails._id.toString()
    await this.repository.removeRefreshToken(id)

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

}