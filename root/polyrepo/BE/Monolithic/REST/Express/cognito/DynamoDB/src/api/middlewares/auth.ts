// import jwt, {JwtPayload} from 'jsonwebtoken'
// import { Request , Response , NextFunction } from 'express'
// import {userFindByID} from '../../services/userService'

// import config from '../../../config'


// export interface CustomRequest extends Request {
//     user: any | JwtPayload;
//    }

// export const auth = async (req : Request , res : Response , next : NextFunction) => {

//     const token  = <any>req.header('Authorization')?.replace('Bearer ', '');

//     if (!token) { 
//         res.status(401).json({
//             error : " Token not found "
//         })
//     }

//     try {
//         const user = await <any>jwt.verify(token , `${config.accessTokenKey}`);
//         const userFind = await userFindByID(user._id);
        
//         (req as CustomRequest).user  =  await userFindByID(user._id);
        
//         //console.log(user._id)
//         next()

//     } catch (error) {
//         res.status(403).json({
//             error : error
//         })
//     }
// }