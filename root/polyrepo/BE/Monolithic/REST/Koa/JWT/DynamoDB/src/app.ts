import Koa from 'koa';
import { DefaultState, DefaultContext } from 'koa';
import Router from 'koa-router';
import dotenv from 'dotenv';
import { connection } from './database/connection';
import userRoutes from './api/routes/user.routes';
import json from 'koa-json';
import bodyParser from 'koa-bodyparser';
const mongoUri = process.env.MONGO_URI;

dotenv.config();
const PORT = process.env.PORT || 3000;

//IMPORTING KOA MIDDLEWARE:
const app: Koa<DefaultState, DefaultContext> = new Koa();
const router: Router = new Router();
app.use(json())
app.use(bodyParser())


//ADDING ROUTES:
app.use(userRoutes.routes()).use(userRoutes.allowedMethods);

//CONNECTING TO DATABASE:
connection.then(() => console.log(`Database connected to ${mongoUri}`)).catch((error) => console.log(error, 'Database connection unsuccessful'));


//CONNECTION TO PORT:
app.listen(PORT, () => {
  console.log(`This application is listening on port ${PORT}`);
});
