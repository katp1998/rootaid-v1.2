import config from 'config'
import axios from 'axios'
import qs from 'qs'

export const getGoogleOAuthTokens = async({code}: {code:string}) =>{
    //setting URL:
    const url = 'http://oauth2.googleapis.com/token'

    //getting values from the configuration file:
    const values = {
        code,
        client_id: config.get("googleClientId"),
        client_secret: config.get("googleClientSecret"),
        redirect_uri: config.get("googleOauthRedirectUri"),
        grant_type: "authorization_code"
    }

    try {
        const response = await axios.post(url, qs.stringify(values), {
            headers:{
                'Content-type': 'application/x-www-form-urlencoded'
            }
        })
        return response.data
    } catch (error) {
        console.log(error, "failed to fetch google oauth tokens")
    }
}