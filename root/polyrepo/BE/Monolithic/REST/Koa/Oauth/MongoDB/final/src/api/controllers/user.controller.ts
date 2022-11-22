import jwt from 'jsonwebtoken'
import { Request, response, Response } from "express"
import config from '../../../../config'
  import { findAndUpdateUser, getGoogleUser, getTokens } from "../../services/user.service"

  //Redirect URI
const redirectURI = config.googleRedirectURI;

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
            clientId: config.googleClientID,
            clientSecret: config.googleClientSecret,
            redirectUri: redirectURI
        })
            
        console.log({id_token, access_token})

        //GET THE ID AND ACCESS TOKEN
        const googleUser = await getGoogleUser({id_token, access_token})
      console.log(getGoogleUser);
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
        const token = jwt.sign(googleUser, config.jwtSecret);
        rs.cookie(config.cookieName, token, {
            maxAge: 900000,
            httpOnly: true,
            secure: false,
          });

        //REDIRECT TO CLIENT
        rs.redirect(config.uiRootURI);

    } catch (error) {
        console.log(error, 'failed to add user')
    }
    
}