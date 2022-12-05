import { genarateUserToken } from '../../utils/index';
import { findUser, createUser, findUserByUsername } from '../../database/repositories/user.repository';
import config from '../../../config';
import axios from 'axios';
import qs from 'qs';

const registerUser = async (name: string, email: string, password: string) => {
    //creating user in database (user.repository):
    
    const TOKEN_DATA = await genarateUserToken();
    const checkExistingUser = await findUser({ email });

    if (!checkExistingUser)
    {
      try {
        const response = await axios({
            method: 'post',
            url: `${config.authServerUrl}admin/realms/${config.realm}/users`,
            data: {
                "enabled": true,
              "username": name,
              "email": email,
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

        const newUser = await createUser({ name, email, password });

        return {
          message: "User created",
          user: newUser
        }

    }
    catch (error)
    {
        return "Username already exists";
      }
      
    }
    else
    {
      return "Email already exists";
    }
  
};


// login

const loginUser = async (name: string, password: string) => {
 
  try
  {
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
    const existingUser = await findUserByUsername(name);

    return {
      user: existingUser,
      access_token: data.access_token
    };
      
  }
  catch (error)
  {

    return "User not authorized";
    }
  
};

export { registerUser, loginUser };