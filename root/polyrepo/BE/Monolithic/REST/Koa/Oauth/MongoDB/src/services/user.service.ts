import axios from 'axios';
import qs from 'qs'
import config from '../../../config'
import { FilterQuery, QueryOptions, UpdateQuery } from 'mongoose';
import UserModel, { UserDocument } from '../../database/models/user.model';

// process.env.GOOGLE_REDIRECT_URI
const redirectURI = config.googleRedirectURI;

//INTERFACES

//Google Token Result structure interface: 
interface GoogleTokenResult{
  access_token: string;
  expires_in: number;
  refresh_token:string;
  scope:string;
  id_token:string
}

//google User result structure interface:
interface GoogleUserResults{
  id:string,
  email:string,
  verified_email:boolean,
  name:string,
  given_name:string,
  family_name:string,
  picture:string,
  locale:string
}

//getting access and id tokens from google URL:
export const getGoogleAuthURL = () => {
    const rootUrl = "https://accounts.google.com/o/oauth2/v2/auth";
    const options = {
      redirect_uri: redirectURI,
      client_id: config.googleClientID,
      access_type: "offline",
      response_type: "code",
      prompt: "consent",
      scope: [
        "https://www.googleapis.com/auth/userinfo.profile",
        "https://www.googleapis.com/auth/userinfo.email",
      ].join(" "),
    };
  
    return `${rootUrl}?${qs.stringify(options)}`;
  }



//getting google tokens:
  export const getTokens = async({
    code,
    clientId,
    clientSecret,
    redirectUri,
  }: {
    code: string;
    clientId: string;
    clientSecret: string;
    redirectUri: string;
  }): Promise<GoogleTokenResult> =>{
    //token url:
    const url = "https://oauth2.googleapis.com/token";

    const values = {
        code,
        client_id: clientId,
        client_secret: clientSecret,
        redirect_uri: redirectUri,
        grant_type: "authorization_code",
    };

    try {
        const response = await axios.post<GoogleTokenResult>(url, qs.stringify(values), {
            headers:{
                'Content-type': 'application/x-www-form-urlencoded'
            }
        })
        return response.data
    } catch (error) {
        console.log(error, "failed to fetch google oauth tokens")
    }
  }

  //getting google user information:
  export const getGoogleUser = async ({id_token, access_token}): Promise<GoogleUserResults> => {
    try {
      const response = await axios.get<GoogleUserResults>(`https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${access_token}`, {
        headers:{
          Authorization: `Bearer ${id_token}`
        }
      })
      return response.data
    } catch (error) {
      console.log(error, "error in getting google user")
    }
    
}
  
  //finding and updating user:
  export const findAndUpdateUser = async(
    query: FilterQuery<UserDocument>,
    update: UpdateQuery<UserDocument>,
    options: QueryOptions = {}
  ) => {
    return UserModel.findOneAndUpdate(query, update, options);
  }