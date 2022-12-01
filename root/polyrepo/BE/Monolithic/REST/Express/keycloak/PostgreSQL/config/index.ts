import dotenv from 'dotenv';

if(process.env.NODE_ENV !== 'production'){
    dotenv.config()
}

export default {
    dbHost: process.env.DB_HOST,
    dbUsername:process.env.DB_USERNAME,
    dbPassword:process.env.DB_PASSWORD,
    dbName:process.env.DB_NAME,
    dbPort:process.env.DB_PORT,
    port: process.env.PORT,
    authServerUrl: process.env.AUTH_SEVER_URL,
    realm: process.env.REALM,
    clientId: process.env.CLIENT_ID,
    secret: process.env.SECRET_ID,
    realmPublicKey: process.env.REALM_PUBLIC_KEY,
    tokenClientId: process.env.TOKEN_CLIENT_ID,
    tokenSecretId: process.env.TOKEN_SECRET_ID
}