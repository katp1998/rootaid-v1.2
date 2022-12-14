import dotenv from 'dotenv';

if(process.env.NODE_ENV !== 'production'){
    dotenv.config()
}

export default {
    dbURL: process.env.DATABASE_URL,
    port: process.env.PORT,
    accessTokenKey : process.env.ACCESS_TOKEN_SECRET_KEY,
    refreshTokenKey : process.env.REFRESH_TOKEN_SECRET_KEY,
    salt: process.env.SALT,
    dynamoAccessKey : process.env.DYNAMODB_ACCESS_KEY,
    dynamoSecretKey : process.env.DYNAMODB_SECRET_ACCESS_KEY,
    region : process.env.REGION
}


