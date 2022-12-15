import express,
{ Router } from 'express'
import {googleOauthHandler} from '../controllers/user.controller'

const userRouter : Router = express.Router()

userRouter.get('/google',googleOauthHandler)

export default userRouter