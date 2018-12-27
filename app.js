//Calling our dependencies

const express = require('express')
const http = require('http')
const app = express()
const port = 3000;
const routes = require('./routes/api')
const mongoose = require('mongoose')
const database = require('./database/database')
//connectig database
mongoose.connect(database.url)
mongoose.connection.on('connected',()=>{
    console.log("Database successfully connected at "+database.url)
})
//configuring routes 
app.get('*',(req,res)=>{
    res.send("Website is under development")
})
app.use('/api',routes)
//create sever 
const sever = http.createServer(app)
//start server 
sever.listen(port,()=>{
    console.log('Server Started on localhost'+port)
})