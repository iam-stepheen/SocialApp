//Calling our dependencies

const express = require('express')
const http = require('http')
const app = express()
const bodyParser = require('body-parser')
const port = process.env.PORT || 8080;
const routes = require('./routes/api')
const mongoose = require('mongoose')
const database = require('./database/database')
const path = require('path')
const passport = require('passport')

//connectig database
mongoose.connect(database.url)
mongoose.connection.on('connected',()=>{
    console.log("Database successfully connected at "+database.url)
})

app.use(express.static(path.join(__dirname,'public')))
app.use(bodyParser.json())
//configuring routes 
app.use(passport.initialize())
app.use(passport.session())
require('./database/passport')(passport)

app.use('/api',routes)
app.get('*',(req,res)=>{
    res.sendFile(path.join(__dirname,'public/index.html'))
})
//create sever 
const sever = http.createServer(app)
//start server 
sever.listen(port,()=>{
    console.log('Server Started on localhost'+port)
})