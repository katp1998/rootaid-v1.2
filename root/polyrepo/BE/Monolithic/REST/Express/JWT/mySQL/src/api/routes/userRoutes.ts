import express, {Router} from 'express'

import {registerUser,loginUser, protectedRoute,refreshToken,logoutUser} from '../controllers/userController'
import {auth} from '../middlewares/auth'


const userRouter : Router = express.Router()


userRouter.post('/register',registerUser)
userRouter.post('/login',loginUser)

userRouter.get('/refreshtoken',refreshToken)

userRouter.post('/logout',logoutUser)
//add test protected route 
userRouter.get('/private', auth ,protectedRoute)
export default userRouter

