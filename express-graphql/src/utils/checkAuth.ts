import jwt from 'jsonwebtoken';
import config from '../../config';


export default async  (context :any )=>{
    const authHeader = context.req.headers.Authorization;
    if ( authHeader) {
        const token = authHeader.split('Bearer ')[1];
        if(token){
            try{
                const user = await jwt.verify(token,`${config.accessTokenKey}`)
                return user
            } catch(err) {
                throw new Error('Invalid/Expired token')
            }
        }
        throw new Error('Authorization token must be \' Bearer [token]')
    }
    throw new Error('Authorization header must be provided')
}