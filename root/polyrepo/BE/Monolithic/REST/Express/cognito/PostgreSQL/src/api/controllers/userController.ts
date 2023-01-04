import { findUserByToken } from "../../database/repository/user.repository"
import { Request, Response , NextFunction } from "express"
import { registerUser, loginUser, verifyRefreshToken, logoutUser} from '../../services/userService'



export const handleRegister = async (req :Request, res : Response, next : NextFunction) =>{
        try {
            const {username, email, password} = req.body
            let userAttr = []
            userAttr.push({Name: 'email', Value: email})
            await registerUser({username, password, userAttr})

            return res.status(201).json({
                username,
                email
            })
        } catch (error : any) {
            res.status(500).json({
                error: error.message
            })
        }
    }

export const handleLogin = async (req : Request,res : Response,next : NextFunction) =>{
        try {
            const { username, password } = req.body
            const refreshToken = await loginUser({ username, password })
            res.cookie('jwt', refreshToken, {httpOnly:true , sameSite:'none', maxAge:24*60*60*1000})
            return res.json({
                message: "Login successful, refresh token saved as cookie!"
            })
        } catch (error :any ) {
            res.status(500).json({
                error: error.message
            })
        }
    }

export const refreshToken = async (req : Request, res : Response ) => {
    const cookies = req.cookies;
    if(!cookies?.jwt) return res.sendStatus(204);
    const refreshToken = cookies.jwt as string

    try {
    //Returns user record which matches the refresh token that was passed
    // await findUserByToken(refreshToken)  
    const result = await verifyRefreshToken(refreshToken) 
    res.status(200).json({accessToken: result})
    } catch (error) {
            res.status(500).json({
                error: error.message
            })
    }
    
}    

export const handleLogout = async (req : Request, res : Response) => {
    
    const cookies = req.cookies;
    if (!cookies?.jwt) return res.sendStatus(204); 
    const refreshToken = cookies.jwt;

    try {
        logoutUser(refreshToken)
        res.clearCookie('jwt', { httpOnly: true, sameSite: 'none', secure: true });
        return res.json({message: 'Successful logout!'})
    } catch (error: any) {
        res.status(500).json({
            error: error.message
        })
    }
}


// export const protectedRoute = async (req : Request,res : Response) => {
//     try {
//         res.status(200).json({
//             message: "successful protected route",
//             user : (req as CustomRequest).user
//         })
//     } catch (error) {
//         res.status(403).json({
            
//         })
//     }
// }