import Koa from 'koa';
import { DefaultState, DefaultContext } from 'koa';
import Router from 'koa-router';
import  connection  from './database/connection';
import userRoutes from './api/routes/user.routes';
import json from 'koa-json';
import bodyParser from 'koa-bodyparser';
import config from './config/index'
const mongoUri = process.env.MONGO_URI;

connection()

//IMPORTING KOA MIDDLEWARE:
const app: Koa<DefaultState, DefaultContext> = new Koa();
const router: Router = new Router();
app.use(json())
app.use(bodyParser())


//ADDING ROUTES:
app.use(userRoutes.routes()).use(userRoutes.allowedMethods);



//CONNECTION TO PORT:
app.listen(config.port, () => {
  console.log(`This application is listening on port ${config.port}`);
});
