import { Request, Response, NextFunction } from "express";
import { signUp, logIn } from "../../services/user.service";

//@method: POST
//@route: /api/user/register
export const registerUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { name, email, password } = req.body;
    const data = await signUp({ name, email, password });
    return res.json(data);
  } catch (error: any) {
    res.status(500).json({
      error: error.message,
    });
  }
};

//@method: POST
//@route: /api/user/login
export const loginUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email, password } = req.body;
    const data = await logIn({ email, password });
    return res.json(data);
  } catch (error: any) {
    res.status(500).json({
      error: error.message,
    });
  }
};

export const refreshToken = async (req: Request, res: Response) => {};

// export const protectedRoute = async (req : Request,res : Response) => {
//     try {
//         res.status(200).json({
//             message: "successful protected route",
//             user : (req as CustomRequest).user
//         })
//     } catch (error) {
//         res.status(500).json({
//             error : error
//         })
//     }
// }
