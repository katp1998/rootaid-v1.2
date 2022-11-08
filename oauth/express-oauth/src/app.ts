import express from 'express'
import dotenv from 'dotenv'
import { connection } from './connection'

dotenv.config()
const app = express()

//GETTING PORT FROM .ENV FILE:
const PORT = process.env.PORT || 1337

//CONNECTING DB:
connection()

//IMPORTING MIDDLEWARE:
app.use(express.json())
app.use(express.urlencoded({extended:true}))

//CONNECTION TO PORT:
app.listen(PORT, () => {
    console.log(`This application is listening on port ${PORT}`)
})