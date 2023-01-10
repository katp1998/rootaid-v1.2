import config from '../../config';
import {
    createUser,
    findUserByUsername,
    saveRefreshToken,
    removeRefreshToken,
    findUserByEmail
} from '../../database/repository/user.repository';
import { genarateUserToken} from '../utils/index';
import qs from 'qs';
import axios from 'axios';

export interface RegisterInputs {
    name:string,
    email:string,
    password:string
}
  
export interface LoginInputs {    
    name: string,
    password:string
}
  

// SignUp
export const signUp = async (userInputs: RegisterInputs) => {
    const {
        name,
        email,
        password
    } = userInputs;
    const TOKEN_DATA = await genarateUserToken();
    const checkExistingUser = await findUserByEmail({ email });
         
    if (!checkExistingUser) { 
            
        try {
            const response = await axios({
                method: 'post',
                url: `${config.authServerUrl}admin/realms/${config.realm}/users`,
                data: {
                    "enabled": true,
                    "username": name,
                    "credentials": [{
                        "type": "password",
                        "value": password,
                        "temporary": false
                    }]
                },
                headers: {
                    Authorization: `Bearer ${TOKEN_DATA.access_token}`,
                    'Content-Type': 'application/json'
                }
            });

        }
        catch (error)
        {
            console.log(error);
            throw new Error("Username already exists");
        }

        // DB 
        const newUser: any = await createUser({ name, email, password });

        return {
            user: newUser,
            message: "User created"
        };

    }
    else
    {
        throw new Error("Email Already Registered");
    }

}

// Login
export const logIn = async (userInputs: LoginInputs) => {

    const { name, password } = userInputs;

    try {
        const response = await axios({
            method: 'post',
            url: `${config.authServerUrl}realms/${config.realm}/protocol/openid-connect/token`,
            headers: { 'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8', },
            data: qs.stringify({
                grant_type: 'password',
                client_id: config.clientId,
                client_secret: config.secret,
                username: name,
                password: password
            })
        });
        
        const data = response.data;

        // console.log(name);
        // get user details 
        const user = await findUserByUsername({name});

        // console.log(user);
        //save refresh token on DB
        await saveRefreshToken(user.userid, data.refresh_token);

        return {
            id: user?.userid,
            name: user?.name,
            refresh_token:data.refresh_token,
            access_token: data.access_token
        };
        
    }
    catch (error)
    {
        console.log(error);
        throw new Error("User unauthorized");
    }

}

//logout user
export const logOut = async (refreshToken : string) =>
{
    try
    {
        const response = await axios({
            method: 'post',
            url: `${config.authServerUrl}realms/${config.realm}/protocol/openid-connect/logout`,
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
                Authorization: `Bearer ${refreshToken}`
            },
        });

        // remove refresh token from DB
        await removeRefreshToken(refreshToken);

        return 'Logout sucessfully';
    }
    catch (error)
    {
        console.log(error);
        return "User not vaildate";
    }
}

// Get access token from refresh token

export const verifyRefreshToken = async (refreshToken: string) =>
{
    try
    {
        const response = await axios({
            method: 'post',
            url: `${config.authServerUrl}realms/${config.realm}/protocol/openid-connect/token`,
            headers: { 'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8', },
            data: qs.stringify({
                grant_type: 'refresh_token',
                client_id: config.clientId,
                client_secret: config.secret,
                refresh_token: refreshToken
            })
        });

        return response.data;

    }
    catch (error)
    {
        console.log(error);
        return 'Refresh token not accepted';
    }
}
  


