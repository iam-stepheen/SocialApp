const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const database = require('../database/database')
const user_functions = require('../funtions/userfunctions')
const multer = require('multer')
const Grid = require('gridfs-stream')
const GridFsStorage = require('multer-gridfs-storage')
const path = require('path')
const methodOveride = require('method-override')
const crypto = require('crypto');


//route to register user into database
router.post('/register',(req,res)=>{
    const details = new user_functions ({
        firstname:req.body.firstname,
        secondname:req.body.secondname,
        email:req.body.email,
        password:req.body.password,
        activated:req.body.activated,  
        freinds:req.body.freinds,
        profilepicture:req.body.profilepicture,
        coverpicture:req.body.coverpicture
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

//route to profile picture upload
//grid fs init
let gfs 
const conn = mongoose.createConnection(database.url);
conn.once('open', ()=> {
  gfs = Grid(conn.db, mongoose.mongo);
  gfs.collection('uploads')
 
  // create storage object 
  
  
})

const storage = new GridFsStorage({
    url: database.url,
    file: (req, file) => {
      return new Promise((resolve, reject) => {
        crypto.randomBytes(16, (err, buf) => {
          if (err) {
            return reject(err);
          }
          const filename = buf.toString('hex') + path.extname(file.originalname);
          const fileInfo = {
            filename: filename,
            bucketName: 'uploads'
          };
          resolve(fileInfo);
        });
      });
    }
  });
  const upload = multer({storage})
//router to upload profile picture 
router.post('/profileupload/:email',upload.single('file'),(req,res)=>{
         const email = req.params.email
         user_functions.check_email(email,(err,user)=>{
             if(err) throw err 
             if(user){
                 user_functions.profile_picture(user.id,req.file.filename,(err,successfull)=>{
                     if(err) throw err 
                     if(successfull){
                        res.json({
                            file:req.file
                        })
                     }
                 })
             }
             else{
                res.json({
                   success:false,
                   message:"User Doesnt Exist"
                })
             }
         })
        
})

//route to get profileimage of a user 
router.get('/image/:filename',(req,res)=>{
    gfs.files.findOne({filename:req.params.filename},(err,file)=>{
        
        if(err) throw err
        if(!file ){
            res.json({
                success:false,
                message:"No files Found"
            })
        }
        else{
            if(file.contentType === 'image/jpeg'||file.contentType == 'image/png'){
                const readstream = gfs.createReadStream(file.filename);
                readstream.pipe(res);
            }
            else{
                res.json({
                    success:false,
                    message:"Not an Image"

                })
            }
        }
    })
})
module.exports = router

