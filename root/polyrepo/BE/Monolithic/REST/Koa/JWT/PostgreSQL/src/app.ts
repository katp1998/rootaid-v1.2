import Koa from 'koa'
import { DefaultState, DefaultContext, ParameterizedContext } from 'koa'
import Router from 'koa-router'
import dotenv from 'dotenv'
import { connection } from './database/connection';
import userRoutes from './api/routes/user.routes'

dotenv.config();
const PORT = process.env.PORT || 3000

//IMPORTING KOA MIDDLEWARE:
const app: Koa<DefaultState, DefaultContext> = new Koa();
const router: Router = new Router();

//ADDING ROUTES:
app.use(userRoutes.routes()).use(userRoutes.allowedMethods);

//CONNECTING TO DATABASE:
connection.then(() => console.log("Database connected")).catch((error) => console.log(error, 'Database connection unsuccessful'))

//CONNECTION TO PORT:
app.listen(PORT, () => {
    console.log(`This application is listening on port ${PORT}`)
})
