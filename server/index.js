const express = require('express')
const cors = require('cors')
const session = require('express-session')
require('dotenv').config()
const {SERVER_PORT, SESSION_SECRET} = process.env
const {auth, deleteUser, checkUser} = require('./authController')

const app = express()

app.use(express.json())
app.use(cors())
app.use(session({
     resave: false,
     saveUninitialized: true,
     secret: SESSION_SECRET,
     cookie: {
         maxAge: 1000 * 60 * 60 * 8
     }
 }))

app.post('/user', auth)
app.delete('/user/:id', deleteUser)
app.get('/user', checkUser)

app.listen(process.env.SERVER_PORT, () => console.log(`Take us to warp ${SERVER_PORT}!`))