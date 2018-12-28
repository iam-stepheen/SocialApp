const express = require('express')
const router = express.Router()
const user_functions = require('../funtions/userfunctions')

//route to register user into database
router.post('/register',(req,res)=>{
    const details = new user_functions ({
        firstname:req.body.firstname,
        secondname:req.body.secondname,
        email:req.body.email,
        password:req.body.password,
        activated:req.body.activated,  
        freinds:req.body.freinds,
    })
  //check if email exist
  user_functions.check_email(details.email,(err,user)=>{
      if (err) throw err
      if (user){
          res.json({
              success:false,
              message:"Email Is Already Taken"
          })
      }
      if (!user){
        user_functions.register(details,(err,user)=>{
            if( err) throw err
            if(user){
                res.json({
                    success:true,
                    message:"Succesfully registered"
                })
            }
        })
      }
  })
})
//route to login users 
router.post('/login',(req,res)=>{
    const email = req.body.email
    const password = req.body.password
    //check if email exist in the database 
    user_functions.check_email(email,(err,user)=>{
        if(err) throw err
        if(user){
      //we compare password with what we have in database
      user_functions.compare_password(password,user.password,(err,successfull)=>{
          if(err) throw err 
          if(successfull == true){
            res.json({
                success:true,
                message:"Login Success"
            })
          }
          else{
            res.json({
                success:false,
                message:"Invalid Email/Password Combination"
            })
          }

      })
        }
        if(!user){
            res.json({
                success:false,
                message:"Invalid Email/Password Combination"
            })
        }
    })
})
module.exports = router

