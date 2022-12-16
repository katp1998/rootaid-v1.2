import { json, urlencoded } from 'body-parser';
import express from 'express';
import dotenv from 'dotenv';
import 'reflect-metadata';
import { connection } from './database/connection';
//import userRoutes

dotenv.config();

//GETTING PORT FROM .ENV FILE:
const PORT = process.env.PORT || 3000;

const app = express();

//IMPORTING EXPRESS MIDDLEWARE:
app.use(json());
app.use(urlencoded({ extended:true }));

//CONNECTING TO DATABASE:
connection.then(() => console.log('Database connected')).catch((error) => console.log(error, 'Database connection unsuccessful'));

//ADDING USER ROUTES:


//CONNECTION TO PORT:
app.listen(PORT, () => {
  console.log(`This application is listening on port ${PORT}`);
});

