import jwt, {JwtPayload} from 'jsonwebtoken'
import { Request , Response , NextFunction } from 'express'
import {userFind} from '../../services/user.service'

import config from '../../../config'


export interface CustomRequest extends Request {
    user: any | JwtPayload;
   }

export const auth = async (req : Request , res : Response , next : NextFunction) => {

    const token  = <any>req.header('Authorization')?.replace('Bearer ', '');

    if (!token) { 
        res.status(401).json({
            error : " Token not found "
        })
    }

    try {
        const user = await <any>jwt.verify(token , `${config.accessTokenKey}`);

        (req as CustomRequest).user  =  await userFind(user._id);

        next()

    } catch (error) {
        res.status(500).json({
            error : error
        })
    }
}