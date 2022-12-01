import config from '../../config';
import {
    findUser,
    createUser,
    findUserByUsername
} from '../../database/repository/user.repository';
import { genarateUserToken} from '../utils/index';
import qs from 'qs';
import axios from 'axios';

// SignUp
export const signUp = async (userInputs: any) => {
    const {
        name,
        email,
        password
    } = userInputs;
    const TOKEN_DATA = await genarateUserToken();
    const checkExistingUser = await findUser({ email });
         
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
export const logIn = async (userInputs: any) => {

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
        // DB
        const existingUser = await findUserByUsername({ name });

        return {
            user: existingUser,
            access_token: data.access_token
        };
        
    }
    catch (error)
    {
        throw new Error("User unauthorized");
    }

}


