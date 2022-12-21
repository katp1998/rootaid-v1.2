import dotenv from 'dotenv';

if(process.env.NODE_ENV !== 'production'){
    dotenv.config()
}

export default {
    port: process.env.PORT,
    region: process.env.AWS_REGION,
    cognitoClientId: process.env.COGNITO_CLIENT_ID,
    cognitoSecret: process.env.COGNITO_SECRET_KEY,
    ddbClientId : process.env.DDB_CLIENT_ID,
    ddbSecret : process.env.DDB_SECRET_KEY,
}