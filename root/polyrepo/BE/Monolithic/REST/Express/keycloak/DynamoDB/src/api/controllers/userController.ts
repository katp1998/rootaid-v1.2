import { Request, Response , NextFunction } from "express"
import { signUp, logIn } from '../../services/userService'

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
        return res.json(data);
        
    }
    catch (error: any)
    {
        res.status(500).json({
            error: error.message
        });
        
    }
    
}
    
  

export const protectedRoute = async (req : Request,res : Response) => {
    try
    {
        res.status(200).json({
            message: "successful protected route",
        }); 
    }
    catch (error)
    {
        res.status(500).json({
            error: error
        });
    }
}