const express = require('express')
const cors = require('cors')
const bodyparser = require('body-parser')

const userRoutes = require('./src/api/routes/userRoutes')



const app = express()

app.use(cors({
    origin: "*",
    credentials: true
}))


app.use(express.json())
app.use(bodyparser.urlencoded({extended : true}))


app.use('user', userRoutes)

app.listen  

