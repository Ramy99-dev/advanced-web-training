const express = require('express')
const mongoose = require('mongoose')
const todoRoute = require('./controller/todoController')
const app = express()

app.use(express.json())
const uri = "mongodb://localhost:27017";
mongoose.connect(uri)

app.use(todoRoute)



app.listen(5000,()=>{
    console.log("Listening on port 5000")
})






