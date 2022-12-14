
import express , { Express ,Request , Response } from 'express';
import cors from 'cors';
import reflectMetaData from 'reflect-metadata'
import bodyparser from 'body-parser'
import cookieParser from 'cookie-parser'
import { connection } from './database/client';

import  userRouter from './api/routes/userRoutes'

import config from './config/index'
import { corsOptions } from './config/corsOptions';
// import { credentials } from './api/middlewares/credentials';
const app : Express = express()

connection()

// app.use(credentials)
app.use(cors(corsOptions))
app.use(express.json())
app.use((bodyparser.urlencoded({ extended: true })))
app.use(cookieParser());

app.get('/' ,(req : Request,res : Response) =>{
    res.json({data : "hello"})
})

app.use('/user', userRouter)


app.listen(config.port, ()=>{
    console.log(`Server running at ${config.port}`)
})

