import jwt from 'jsonwebtoken'
import { Request, response, Response } from "express"
import {

    GOOGLE_CLIENT_ID,
    JWT_SECRET,
    GOOGLE_CLIENT_SECRET,
    COOKIE_NAME,
    UI_ROOT_URI,
  } from "../config";
  import { findAndUpdateUser, getGoogleUser, getTokens } from "../services/user.service"

  //Redirect URI
  const redirectURI = process.env.GOOGLE_REDIRECT_URI


//LOGIN
//@method: POST
//@url: /api/oauth/login



//GoogleOauthHandler
//@method: POST
//@url: /api/oauth
// Getting the user from Google with the code and adding user
export const googleOauthHandler = async(rq: Request, rs: Response) =>{

    try {
        //GET THE CODE FROM QUERY STRING
        const code = rq.query.code as string
        const {id_token, access_token} = await getTokens({
            code,
            clientId: GOOGLE_CLIENT_ID,
            clientSecret: GOOGLE_CLIENT_SECRET,
            redirectUri: redirectURI
        })
            
        console.log({id_token, access_token})

        //GET THE ID AND ACCESS TOKEN
        const googleUser = await getGoogleUser({id_token, access_token})

        //check if google user is returned:
        if(!googleUser.verified_email){
            return rs.status(403).send('Google account not verified')
        }

        //UPSERT USER  
        const user = await findAndUpdateUser(
            {
              email: googleUser.email,
            },
            {
              email: googleUser.email,
              name: googleUser.name,
              picture: googleUser.picture,
            },
            {
              upsert: true,
              new: true,
            }
          );

        //CREATE ACCESS & REFRESH TOKENS
        const token = jwt.sign(googleUser, JWT_SECRET);
        rs.cookie(COOKIE_NAME, token, {
            maxAge: 900000,
            httpOnly: true,
            secure: false,
          });

        //REDIRECT TO CLIENT
        rs.redirect(UI_ROOT_URI);

    } catch (error) {
        console.log(error, 'failed to add user')
    }
    
}