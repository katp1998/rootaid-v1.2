import { Injectable } from "@nestjs/common";

import * as AWS from 'aws-sdk'
import * as crypto from 'crypto'

@Injectable()
export class AuthService {

private config = {
    region: 'us-east-1'
}

private secretHash = '1ofv95uvqt9knp7vsg7g3ark5k192g46qt73iur43mat30604u0c'
private clientId = '51qtvnblrch9vm6cbhgfaj37sl'

private cognitoService = new AWS.CognitoIdentityServiceProvider(this.config)

private generateHash = (username: string): string => {
    return crypto.createHmac('SHA256', this.secretHash)
      .update(username + this.clientId)
      .digest('base64')
}

async register(username:string, password:string, userAttr:Array<any>) {
    const params = {
    ClientId: this.clientId,
    Password: password,
    Username: username,
    SecretHash: this.generateHash(username),
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