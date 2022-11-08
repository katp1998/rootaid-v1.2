import dotenv from 'dotenv'

//IMPORTING DOTENV:
dotenv.config();

export default {
    port: process.env.PORT,
    origin:process.env.ORIGIN,
    dbUri:process.env.DB_URI,
    saltWorkFactor: 10,
    accessTokenTtl: "15m",
    refreshTokenTtl: "1y",
    publicKey: process.env.PUBLIC_KEY,
    privateKey: process.env.PRIVATE_KEY,
    googleClientId:process.env.GOOGLE_CLIENT_ID,
    googleClientSecret: process.env.GOOGLE_CLIENT_SECRET,
    googleOauthRedirectUri: process.env.GOOGLE_OAUTH_REDIRECT_URL,
  };