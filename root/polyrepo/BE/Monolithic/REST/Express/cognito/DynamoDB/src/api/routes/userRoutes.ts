import express, {Router} from 'express'

import {handleRegister, handleLogin, refreshToken, handleLogout} from '../controllers/userController'
// import {auth} from '../middlewares/auth'

const userRouter : Router = express.Router()

userRouter.post('/register', handleRegister)
userRouter.post('/login', handleLogin)
userRouter.get('/refreshtoken', refreshToken)
userRouter.post('/logout', handleLogout)

//protected route 
// userRouter.get('/private', auth ,protectedRoute)

export default userRouter

