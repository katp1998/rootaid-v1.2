import { Request, Response , NextFunction } from "express"
import jwt from 'jsonwebtoken';
import { JwtPayload } from "jsonwebtoken";
import config from '../../../config'
import { generateToken } from "../../utils";

export interface CustomRequest extends Request {
    user: any | JwtPayload;
   }


const {signUp, logIn, userFind, logout} = require('../../services/userService')



export const registerUser = async (req :Request,res : Response,next : NextFunction) =>{
        try {
            const {name,email,password} = req.body
            const data = await signUp({name,email,password})
            res.cookie('jwt',data.refreshToken, {httpOnly:true , sameSite:'none', maxAge:24*60*60*1000})
            return res.json({
                id: data.id,
                name:data.name,
                accessToken:data.accessToken
            })
        } catch (error : any) {
            res.status(500).json({
                error: error.message
            })
        }
    }

export const loginUser = async (req : Request,res : Response,next : NextFunction) =>{
        try {
            const {email,password} = req.body
            const data = await logIn({email,password})
            res.cookie('jwt',data.refreshToken, {httpOnly:true , sameSite:'none', maxAge:24*60*60*1000})
            return res.json({
                id: data.id,
                name:data.name,
                accessToken:data.accessToken
            })
        } catch (error :any ) {
            res.status(500).json({
                error: error.message
            })
        }
    }

export const refreshToken = async (req : Request, res : Response ) =>{
    const cookies = req.cookies;
    if(!cookies?.jwt) return res.sendStatus(204);
    const refreshToken = cookies.jwt as string
    console.log("Refresh Token Endpoint", refreshToken)
    

    const findUser = await  userFind(refreshToken)// servcies to find user using refresh token 
    if(!findUser) return res.sendStatus(403);

    jwt.verify(
        refreshToken,
        `${config.refreshTokenKey}`,
        async (err:any,decoded:any) =>{
            if(err || findUser.name !== decoded.name) return res.sendStatus(403);
            const accessToken = await  generateToken({email:findUser.email , _id: findUser._id})
            res.json({accessToken})        
        }
    )
    
}    

export const logoutUser =async (req : Request, res : Response) => {
    
    const cookies = req.cookies;
    if (!cookies?.jwt) return res.sendStatus(204); 
    const refreshToken = cookies.jwt;

    const findUser = logout(refreshToken)
    if (!findUser) {
        res.clearCookie('jwt', { httpOnly: true, sameSite: 'none', secure: true });
        return res.sendStatus(204);
    }   
    
    res.clearCookie('jwt', { httpOnly: true, sameSite: 'none', secure: true });
    return res.sendStatus(204);
}


export const protectedRoute = async (req : Request,res : Response) => {
    try {
        res.status(200).json({
            message: "successful protected route",
            user : (req as CustomRequest).user
        })
    } catch (error) {
        res.status(403).json({
            
        })
    }
}