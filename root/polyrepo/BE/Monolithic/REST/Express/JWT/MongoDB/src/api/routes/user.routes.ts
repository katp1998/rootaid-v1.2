import express, {Router} from 'express'

import {handleLogin , handleRegister, protectedRoute, refreshToken} from '../controllers/user.controller'
import {auth} from '../middlewares/auth'


const userRouter : Router = express.Router()


userRouter.post('/register',handleRegister)
userRouter.post('/login',handleLogin)

userRouter.post('/refreshtoken',auth,refreshToken)


//add test protected route 
userRouter.get('/private', auth ,protectedRoute)
export default userRouter

