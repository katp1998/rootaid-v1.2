import { Request, Response , NextFunction } from "express"
import { JwtPayload } from "jsonwebtoken";
export interface CustomRequest extends Request {
    user: any | JwtPayload;
   }
import { registerUser, loginUser } from '../../services/user.service';


//REGISTERING USER
export const handleRegister = async (req :Request,res : Response,next : NextFunction) =>{
        try {
            const {name,email,password} = req.body;
            //PASSING INTO METHOD IN USER.SERVICE
            const data = await registerUser(name,email,password);
            return res.json(data);
        } catch (error : any) {
            res.status(500).json({
                error: error.message
            })
        }
    }

//LOGIN USER:
export const handleLogin = async (req : Request,res : Response,next : NextFunction) =>{
        try {
            const {email,password} = req.body;
            //PASSING INTO METHOD IN USER.SERVICE:
            const data = await loginUser(email,password);
            return res.json(data);
        } catch (error :any ) {
            res.status(500).json({
                error: error.message
            })
        }
    }

export const refreshToken = async (req : Request, res : Response ) =>{
    
}    

export const protectedRoute = async (req : Request,res : Response) => {
    try {
        res.status(200).json({
            message: "successful protected route",
            user : (req as CustomRequest).user
        })
    } catch (error) {
        res.status(500).json({
            error : error
        })
    }
}