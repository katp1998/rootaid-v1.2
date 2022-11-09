import { json, urlencoded } from 'body-parser';
import express from 'express';
import dotenv from 'dotenv';
import { createConnection } from 'typeorm'; //datasource?? 
import { User } from './database/models/user.model'
import 'reflect-metadata'
//import userRoutes from './api/routes/userRoutes'

dotenv.config();

//GETTING PORT FROM .ENV FILE:
const PORT = process.env.PORT || 3000

const app = express();

//IMPORTING EXPRESS MIDDLEWARE:
app.use(json());
app.use(urlencoded({extended:true}))

//SYNCING DATABASE:
createConnection({
    type:'postgres',
    host:process.env.DB_HOST,
    port: 5432,
    database: process.env.DB_NAME,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    logging: true,
    synchronize: true,
      entities: [User]
  }).then(() => console.log("Database connected")).catch((error) => console.log(error, 'Database connection unsuccessful'))

//ADDING USER ROUTES:
//app.use("/api/users", userRoutes)




//CONNECTION TO PORT:
app.listen(PORT, () => {
    console.log(`This application is listening on port ${PORT}`)
})

