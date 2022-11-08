import { Request, Response } from "express";
import { getGoogleOAuthTokens } from "../service/user.service";

export const googleOauthHandler = async(rq: Request, rs: Response) =>{
    //GET THE CODE FROM QUERY STRING
    const code = rq.query.code as string
    const {id_token, access_token} = await getGoogleOAuthTokens({code})
    console.log({id_token, access_token})
    
    //GET THE ID AND ACCESS TOKEN

    //GET USER WITH TOKENS

    //UPSERT USER

    //CREATE ACCESS & REFRESH TOKENS

    //REDIRECT TO CLIENT
}