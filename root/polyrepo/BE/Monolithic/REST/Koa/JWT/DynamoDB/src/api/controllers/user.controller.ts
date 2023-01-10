import { Context , Request} from 'koa';
import jwt, { JwtPayload} from 'jsonwebtoken';
import config from '../../config'
import { registerUser, loginUser, userFind, logout } from '../../services/auth/user.service';
import { generateToken } from "../../utils";


export interface CustomRequest extends Request {
  user: any | JwtPayload;
 }


//REGISTERING USER
export const handleRegister = async (ctx: any) => {
  try {
    const { name, email, password } = ctx.request.body;
    const data = await registerUser({name,email,password})
    ctx.cookies.set('jwt',data.refreshToken, {httpOnly:true , sameSite:'none', maxAge:24*60*60*1000})
    return ctx.body = {
        id:data.id,
        name:data.name,
        accessToken : data.accessToken
        };
  } catch (error:any) {
    ctx.body = {error : error.message}
  }
  console.log()
};

//LOGIN USER
export const handleLogin = async (ctx: any) => {
  try {
    const { email, password } = ctx.request.body;
    const data = await loginUser({email, password});
    console.log("done login service")
    ctx.cookies.set('jwt',data.refreshToken, {httpOnly:true , sameSite:'none', maxAge:24*60*60*1000})
    console.log("done cookie")
    return ctx.body = {
      id:data.id,
      name:data.name,
      accessToken : data.accessToken
      }
    } catch (error:any) {
      ctx.body = {error : error.message}
    }

  
};


export const refreshToken = async (ctx: any) => { 
    const cookies = ctx.cookies.get('jwt')
    if(!cookies) return ctx.status = 204
    const refreshToken = cookies as string

    const findUser = await userFind(refreshToken)
    if(!findUser) return ctx.status = 403
    
    jwt.verify(
      refreshToken,
      `${config.refreshTokenKey}`,
      async (err:any, decoded:any) => {
        if(err || findUser.name !== decoded.name) return ctx.status(403)
        const accessToken = await  generateToken({name:findUser.name, id: findUser.id})
        ctx.body = {accessToken}
      }
    )



}

export const logoutUser =async (ctx:any) => {
  const cookies = ctx.cookies.get('jwt')
  if(!cookies) return ctx.status = 204
  const refreshToken = cookies as string

  const findUser = logout(refreshToken)
  if(!findUser) {
    ctx.cookies.set('jwt', '')
    return ctx.status = 204 
  }

  ctx.cookies.set('jwt', '')
  ctx.status = 204
  ctx.body = { message : "Logged Out Successfully"}
  return
  
  

}


export const protectedRoute = async (ctx : any ) => {
  try {
    ctx.status = 200
    ctx.body = {
      message: "successful protected route",
      user : ctx.body.userData
    }
  } catch (error) {
    ctx.body = {error : error.message}
  }
}

