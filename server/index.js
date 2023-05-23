require('dotenv').config()
const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const { connectionMongoDB} = require('./db')
const envs = require('./envs')
const userRouter = require('./routes/userRoutes')
const recipeRouter = require('./routes/recipeRoutes')

const  app =  express()

app.use(express.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use('/uploads', express.static('uploads'))
app.use(cors())

connectionMongoDB()

app.use('/auth' , userRouter)
app.use('/recipes' , recipeRouter)

app.listen(envs.PORT, ()  =>{
	console.log(`server running on ${envs.PORT} `)
})
