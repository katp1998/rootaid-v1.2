import express, { Express, Request, Response} from 'express';
import 'reflect-metadata';
import { connection } from './database/connection';
import cors from 'cors';
import bodyparser from 'body-parser';
import config from "./config"
import userRouter from './src/api/routes/userRoutes';
import { getKeycloak, getStore } from './config/keycloak-config';
import session from 'express-session';


//GETTING PORT FROM .ENV FILE:
const PORT = config.port || 3000;

// get keycloak
const keycloak = getKeycloak(); 

const app: Express = express();

const memoryStore = getStore();

app.use(session({
    secret: "Mysecret",
    resave: false,
    saveUninitialized: true,
    store: memoryStore
}));
  
app.use(keycloak.middleware());

app.use(cors())
app.use(express.json())
app.use((bodyparser.urlencoded({ extended: true })))

//CONNECTING TO DATABASE:
connection.then(() =>
    console.log('Database connected'))
    .catch(
        (error) =>
            console.log(error, 'Database connection unsuccessful')
    );

app.get('/',keycloak.protect(),(req: Request, res: Response) => {
    res.json({ data: "hello" })
});

app.use('/user', userRouter);

//CONNECTION TO PORT:
app.listen(PORT, () => {
  console.log(`This application is listening on port ${PORT}`);
});

