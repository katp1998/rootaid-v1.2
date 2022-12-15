import dotenv from 'dotenv';

if(process.env.NODE_ENV !== 'production'){
    dotenv.config()
}

export default {
    port: process.env.PORT,
    googleClientID: process.env.GOOGLE_CLIENT_ID,
    googleClientSecret: process.env.GOOGLE_CLIENT_SECRET,
    googleRedirectURI: process.env.GOOGLE_REDIRECT_URI,
    jwtSecret: process.env.JWT_SECRET,
    mongodbURI: process.env.MONGO_URI,
    uiRootURI: process.env.UI_ROOT_URI,
    cookieName: process.env.COOKIE_NAME
}