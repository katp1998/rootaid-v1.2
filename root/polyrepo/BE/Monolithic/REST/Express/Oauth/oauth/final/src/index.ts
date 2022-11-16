import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import {
    UI_ROOT_URI,
  } from "./config";
import { connection } from './database/connection';

//dotenv config:
dotenv.config();

//initializing express and getting port:
const app = express();
const PORT = process.env.PORT;

app.use(
    cors({
    // Sets Access-Control-Allow-Origin to the UI URI
    origin: UI_ROOT_URI,
    // Sets Access-Control-Allow-Credentials to true
    credentials: true,
    })
)

//database connection:
connection();


const main = () => {
  app.listen(PORT, () => {
    console.log(`App listening on PORT:${PORT}`);
  });
}

//run the main function
main();