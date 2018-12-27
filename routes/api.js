const express = require('express')
const router = express.Router()
const user_functions = require('../funtions/userfunctions')

//route to register user into database
router.post('/register',(req,res)=>{
    const details = ({
        firstname:req.body.firstname,
        secondname:req.body.secondname,
        email:req.body.email,
        password:req.body.password,
        activated:req.body.activated,
        
    })
})
module.exports = router