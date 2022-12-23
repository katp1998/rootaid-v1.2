import AWS from 'aws-sdk'
import * as crypto from 'crypto';
import { v4 as uuidv4 } from 'uuid';
import config from '../config'
import  {findUser, createUser, findUserByToken , saveRefreshToken, removeRefreshToken} from '../database/repository/user.repository'
import { hashPassword, validatePassword } from '../utils/index'

export interface RegisterInputs {
    username: string,
    password: string,
    userAttr: Array<any>,
    refreshToken?: string
  }
  
export interface LoginInputs {    
    username:string,
    password:string
}

const awsConfig = {
  region: config.region
}

const secretHash: string = config.cognitoSecret
const clientId: string = config.cognitoClientId

const generateHash = (username: string) => {
  return crypto
    .createHmac('SHA256', secretHash)
    .update(username + clientId)
    .digest('base64');
};

const cognitoService = new AWS.CognitoIdentityServiceProvider(awsConfig);

export const registerUser = async (userInputs: RegisterInputs) => {
    const { username, password, userAttr } = userInputs
    const email: string = userAttr[0].Value;

    const params = {
        ClientId: clientId,
        Password: password,
        Username: username,
        SecretHash: generateHash(username),
        UserAttributes: userAttr,
    }

    const id = uuidv4()

    try {
        const hashedPassword: string  = await hashPassword(password)

        const cognitoResponse = await cognitoService.signUp(params).promise();
        console.log(`Created cognito user:
        username: ${username},
        email: ${email},
        message: ${cognitoResponse.$response.data}`);


        const user = await createUser({username, password: hashedPassword, email,})
        console.log(user);

        return cognitoResponse
  } catch (error) {
    console.log(`Error occurred: ${error}`);
  };
}

export const loginUser = async (userInputs : LoginInputs) =>{

    const {username, password} = userInputs

    const params = {
        AuthFlow: 'USER_PASSWORD_AUTH',
        ClientId: clientId,
        AuthParameters: {
            'USERNAME': username,
            'PASSWORD': password,
            "SECRET_HASH": generateHash(username)
        }
  } 

    try {
        const data = await cognitoService.initiateAuth(params).promise()
        const refreshToken = data.AuthenticationResult.RefreshToken as string

        const existingUser = await findUser(username)
        console.log(existingUser[0].id)
        await saveRefreshToken(existingUser[0].id, refreshToken)

        return refreshToken
    } catch (error) {
        console.log(error);
        return 'Login unsuccessful'
    }
}

export const verifyRefreshToken = async (refreshToken: string) => {
    try {
        const existingUser = await findUserByToken(refreshToken)
        const params = {
            AuthFlow: 'REFRESH_TOKEN_AUTH',
            ClientId: clientId,
            AuthParameters: {
                'REFRESH_TOKEN': refreshToken,
                "SECRET_HASH": generateHash(existingUser.username)
            }
        }
        const data = await cognitoService.initiateAuth(params).promise()
        return data.AuthenticationResult.AccessToken 
  } catch (error) {
        console.log(error);
        return 'Refresh token not accepted'
  }
}

export const logoutUser = async (refreshToken : string) => {
    try {

        const getAccessToken = await verifyRefreshToken(refreshToken)

        //Removes refresh token from Dynamodb
        await removeRefreshToken(refreshToken)

        const params = {
        AccessToken: getAccessToken as string,
        }

        const cognitoResult = await cognitoService.globalSignOut(params)
        console.log("Successful logout")
        return cognitoResult
  } catch (error) {
        console.log(error)
  }
}

