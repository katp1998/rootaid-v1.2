import { genarateUserToken } from '../../utils/index';
import {
  createUser,
  findUserByEmail,
  findUserByUsername,
  removeRefreshToken,
  saveRefreshToken
} from '../../database/repositories/user.repository';
import config from '../../../config';
import axios from 'axios';
import qs from 'qs';

// create user
const signUp = async (name: string, email: string, password: string) => {
  //creating user in database (user.repository):
  
  const TOKEN_DATA = await genarateUserToken();
  const checkExistingUser = await findUserByEmail({ email });

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
      console.log(error);
      throw new Error("Username already exists");
    }
    
  }
  else
  {
    throw new Error("Email already exists");
  }

};


// login

const logIn = async (name: string, password: string) => {

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
  const existingUser = await findUserByUsername({name});

  await saveRefreshToken(existingUser._id, data.refresh_token);

  return {
    id: existingUser._id,
    name: existingUser.name,
    refresh_token:data.refresh_token,
    access_token: data.access_token
};
    
}
catch (error)
{
  console.log(error);
  throw new Error("User unauthorized");
}


};


//logout 
const logOut = async (refreshToken: string) => 
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
  throw new Error("User not vaildate");
}
}


// Get access token from refresh token
const verifyRefreshToken = async (refreshToken: string) =>
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

    console.log(response.data);
      return response.data;
  }
  catch (error)
  {
    console.log(error);
    throw new Error("Refresh token not accepted");
}  
}

export {
signUp,
logIn,
logOut,
verifyRefreshToken
};