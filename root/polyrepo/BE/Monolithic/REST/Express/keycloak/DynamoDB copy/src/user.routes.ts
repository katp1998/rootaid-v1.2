import express, {Router} from 'express'

import {registerUser,loginUser, protectedRoute,refreshToken} from '../src/user.controller'
//import {auth} from '../middlewares/auth'


const userRouter : Router = express.Router()


userRouter.post('/register',registerUser)
//userRouter.post('/login',loginUser)

//userRouter.post('/refreshtoken',refreshToken)


//add test protected route 
// userRouter.get('/private', protectedRoute)
export default userRouter