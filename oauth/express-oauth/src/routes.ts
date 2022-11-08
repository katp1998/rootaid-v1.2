import express from 'express'
import { googleOauthHandler } from './controller/user.controller';

const app = express();

const routes = () =>{
  app.get("/api/auth/session/google", googleOauthHandler)
}