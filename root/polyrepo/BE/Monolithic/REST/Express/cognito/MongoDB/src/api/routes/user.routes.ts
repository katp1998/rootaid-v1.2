import express, {Router} from 'express'
import {registerUser,loginUser, refreshToken} from '../controllers/user.controller'

const userRouter : Router = express.Router()

userRouter.post('/register',registerUser)
userRouter.post('/login',loginUser)

userRouter.post('/refreshtoken', refreshToken)


//add test protected route 
// userRouter.get('/private', auth ,protectedRoute)

export default userRouter

