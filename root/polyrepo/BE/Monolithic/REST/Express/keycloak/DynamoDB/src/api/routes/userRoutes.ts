import { initKeycloak } from '../../../config/keycloak-config';
import express, { Router } from 'express';
import { registerUser, loginUser, protectedRoute } from '../controllers/userController';

const userRouter: Router = express.Router();

// initalize keycloak
const keycloak = initKeycloak();
console.log("keycloak initaied");

userRouter.post('/register', registerUser);
userRouter.post('/login', loginUser);

//add test protected route 
userRouter.get('/private',keycloak.protect(),protectedRoute);

export default userRouter;

