import Koa from 'koa';
import { DefaultState, DefaultContext } from 'koa';
import Router from 'koa-router';
import { connection } from './database/connection';
import userRoutes from './api/routes/user.routes';
import json from 'koa-json';
import bodyParser from 'koa-bodyparser';
import config from '../config';
// import { getKeycloak } from '../config/keycloak-config';


const PORT = config.port || 3000;

// get keycloak
// const keycloak = getKeycloak(); 
// console.log(keycloak);
//IMPORTING KOA MIDDLEWARE:
const app: Koa<DefaultState, DefaultContext> = new Koa();
 
const router: Router = new Router();


// keycloak.middleware()
//   .map(item => {
//     console.log(item);
//     app.use(item)
//   });

 

//   app.use(keycloak.middleware(
//     {
//         logout: '/logout',
//         admin: '/',
//         protected:'/protected/resource'
//     }
// ));

app.use(json())
app.use(bodyParser())

//ADDING ROUTES:
app.use(userRoutes.routes()).use(userRoutes.allowedMethods);

//CONNECTING TO DATABASE:
connection.then(() => console.log(`Database connected`)).catch((error) => console.log(error, 'Database connection unsuccessful'));

//CONNECTION TO PORT:
app.listen(PORT, () => {
  console.log(`This application is listening on port ${PORT}`);
});
