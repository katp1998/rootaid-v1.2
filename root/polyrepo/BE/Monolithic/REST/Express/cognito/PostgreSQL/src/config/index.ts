import dotenv from 'dotenv';

if(process.env.NODE_ENV !== 'production'){
    dotenv.config()
}

export default {
    port: process.env.PORT,
    db: process.env.DB_NAME,
    dbHost: process.env.DB_HOST,
    dbUsername: process.env.DB_USERNAME,
    dbPassword: process.env.DB_PASSWORD,
    dbPort: process.env.DB_PORT,
    region: process.env.AWS_REGION,
    cognitoClientId: process.env.COGNITO_CLIENT_ID,
    cognitoSecret: process.env.COGNITO_SECRET_KEY,
}