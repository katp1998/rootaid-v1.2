import { initKeycloak } from '../../../config/keycloak-config';
import express, { Router } from 'express';
import {
    registerUser,
    loginUser,
    protectedRoute,
    refreshToken,
    logoutUser
} from '../controllers/userController';

const userRouter: Router = express.Router();

// initalize keycloak
const keycloak = initKeycloak();
console.log("keycloak initaied");

userRouter.post('/register', registerUser);
userRouter.post('/login', loginUser);
userRouter.get('/refreshToken', refreshToken);
userRouter.post('/logout', logoutUser);

//add test protected route 
userRouter.get('/private',keycloak.protect(),protectedRoute);

export default userRouter;

