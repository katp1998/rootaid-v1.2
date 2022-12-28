import jwt, {JwtPayload} from 'jsonwebtoken'
import { Request , Response , Next } from 'koa'
import { userFindByID } from '../../services/auth/user.service'
import config from '../../config'


export interface CustomRequest extends Request {
    user : any | JwtPayload;
}

export const auth =async (ctx : any, next :Next) => {

    let token = ctx.request.header.authorization
    token = token.replace('Bearer ','')
    if (!token) {
        ctx.status = 401
        ctx.body = {
            error : "Token not found "
        }
        return
    }

    // console.log(token as string)
    try {
        const user = <any>await jwt.verify(token, `${config.accessTokenKey}`);

        const userData = await userFindByID(user.id);
        ctx.body = {
            userData
        }

        next()

    } catch (error) {
        ctx.status = 403
        ctx.body = { 
            error :error
        }
    }
}