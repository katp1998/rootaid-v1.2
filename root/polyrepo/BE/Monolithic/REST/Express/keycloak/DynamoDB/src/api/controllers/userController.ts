import { Request, Response , NextFunction } from "express"
import { signUp, logIn, verifyRefreshToken, logOut } from '../../services/userService'

// RegisterUser
export const registerUser = async (req :Request,res : Response,next : NextFunction) =>{
        try {
            const {
                name,
                email,
                password } = req.body;
            const data = await signUp({ name, email, password });
            return res.json(data);

        }
        catch (error: any)
        {
            res.status(500).json({
                error: error.message
            });
        }
    }

export const loginUser = async (req: Request, res: Response, next: NextFunction) => {
    try {

        const { name, password } = req.body;
        const data = await logIn({ name, password });

        // set cookie on refresh token
      await res.cookie('jwt', data.refresh_token, { httpOnly: true, sameSite: 'none', maxAge: 24 * 60 * 60 * 1000 });
        
        return res.json({
            id: data.id,
            name: data.name,
            accessToken: data.access_token
        });        
    }
    catch (error: any)
    {
        res.status(500).json({
            error: error.message
        });
        
    }    
}

//Get access token
export const refreshToken = async (req: Request, res: Response) => {
    
    const cookies =await req.cookies;

    if (!cookies?.jwt) return res.sendStatus(204);
    
    const refreshToken = cookies.jwt as string;

    console.log("Refresh Token Endpoint", refreshToken);

    const data = await verifyRefreshToken(refreshToken);

    const accessToken = data.access_token;

    res.json({ accessToken });
}
  
// logout user
export const logoutUser = async (req: Request, res: Response) => {
    const cookies = req.cookies;

    if (!cookies?.jwt) return res.sendStatus(204);
    
    const refreshToken = cookies.jwt as string;

    console.log("Refresh Token Endpoint", refreshToken);

    await logOut(refreshToken);

    // clear cookie
    res.clearCookie('jwt', { httpOnly: true, sameSite: 'none', secure: true });

    return res.sendStatus(204);
}  

// protect route
export const protectedRoute = async (req : Request,res : Response) => {
    try
    {
        res.status(200).json({
            message: "successful protected route",
        }); 
    }
    catch (error)
    {
        res.status(403).json({
            error: error
        });
    }
}