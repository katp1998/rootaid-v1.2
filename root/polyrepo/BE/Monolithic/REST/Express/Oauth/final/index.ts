import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import config from './config';
import { connection } from './database/connection';
import userRouter from './src/api/routes/user.routes'
//dotenv config:
dotenv.config();
 
//initializing express and getting port:
const app = express();
const PORT = config.port || 4000;

app.use(
    cors({
    // Sets Access-Control-Allow-Origin to the UI URI
    origin: config.uiRootURI,
    // Sets Access-Control-Allow-Credentials to true
    credentials: true,
    })
)

//database connection:
connection();

app.use('/auth', userRouter);


const main = () => {
  app.listen(PORT, () => {
    console.log(`App listening on PORT:${PORT}`);
  });
}

//run the main function
main();