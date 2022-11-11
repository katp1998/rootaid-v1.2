import { json, urlencoded } from 'body-parser';
import express from 'express';
import {connection} from './database/connection';
import dotenv from 'dotenv';
import { createConnection } from 'typeorm';
import { User } from './database/models/user.models'
import 'reflect-metadata'
//import userRoutes from './api/routes/userRoutes'

dotenv.config();

//GETTING PORT FROM .ENV FILE:
const PORT = process.env.PORT || 3000

const app = express();

//IMPORTING EXPRESS MIDDLEWARE:
app.use(json());
app.use(urlencoded({extended:true}))

//CONNECTING DATABASE:
connection.then(() => console.log("Database connected")).catch((error) => console.log(error, 'Database connection unsuccessful'))

//ADDING USER ROUTES:
//app.use("/api/users", userRoutes)




//CONNECTION TO PORT:
app.listen(PORT, () => {
    console.log(`This application is listening on port ${PORT}`)
})

