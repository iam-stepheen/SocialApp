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
const freindrequest = require('../funtions/freindrequest')
const passport = require('passport')
const jwt = require('jsonwebtoken')

//route to handle authentication
router.post('/auth',(req,res)=>{

    const request =  req.body.request
    if(request == 'register'){
        const details = new user_functions ({
            firstname:req.body.firstname,
            secondname:req.body.secondname,
            email:req.body.email,
            password:req.body.password,
            activated:req.body.activated,  
            freinds:req.body.freinds,
            profilepicture:req.body.profilepicture,
            coverpicture:req.body.coverpicture,
            gender:req.body.gender,
            occupation:req.body.occupation,
            email:req.body.email,
            website:req.body.website,
            phone:req.body.phone,
            education:req.body.education,
            social:req.body.social,
            joined:req.body.joined,
            fullname:req.body.firstname.toLowerCase() + " "+ req.body.secondname.toLowerCase()
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
    }
     if(request == 'login'){
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
                  const token = jwt.sign(user.toJSON(),database.secret)
                res.json({
                    success:true,
                    message:"Login Success",
                    token:"jwt "+token
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
     }
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
router.post('/profileupload/::email',upload.single('file'),(req,res)=>{
    console.log('xx')
         const email = req.params.email
         user_functions.check_email(email,(err,user)=>{
             console.log(email)
             if(err) throw err 
             if(user){
                 user_functions.profile_picture(user.id,req.file.filename,(err,successfull)=>{
                     if(err) throw err 
                     if(successfull){
                        res.json({
                            success:true,
                            msg:"Profile Picture Successfully Uploaded"
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
router.post('/freindrequest',(req,res)=>{
    const request = req.body.request
      if(request == "send_request"){
        let details = new freindrequest({
            sender : req.body.sender,
            reciever : req.body.reciever,
           status:0
        })
        //first we check if the requesthas already been sent 
        freindrequest.check(details.sender,details.reciever,(err,user)=>{
            if(err) throw err
             if(user == null){
                freindrequest.send_request(details,(err,successfull)=>{
                    if(err) throw err
                    if(successfull){
                        res.json({
                            success:true,
                            message:"Freind Request Sent"
                        })
                    }
                })
             }
             if(user !== null){
                 res.json({
                    success:false,
                    message:"Freind Request Has already been sent"
                 })
             
             }
        })
       
      }

      if(request == 'accept_request'){
          const sender = req.body.sender
          const reciever = req.body.reciever

          freindrequest.accept(sender,reciever,(err,successfull)=>{
            if(err) throw err
            if(successfull.status == 1){
                console.log(successfull)
              res.json({
                  success:true,
                  message:"You're already freind with this user"
               })
            }
            if(successfull.status == 0){
                user_functions.accept_freindrequest(sender,reciever,(err,successfull)=>{
                    if(err) throw err
                    else{
                      
                       
                    }
                })
            }
        })
         
          

      }
       
      if(request == 'find_freinds'){
          const fullname = req.body.fullname
          user_functions.check_name(fullname,(err,user)=>{
              if(err) throw err
              if(user){
                  res.json({
                        success:true,
                        found:user
                  })
              }
          })
      }
      if(request == 'get_request'){
          const details=({
              reciever:req.body.reciever,
              status:req.body.status
          })
          freindrequest.get_requests(details,(err,successfull)=>{
              if(err) throw err
              if(successfull){
                  res.json({
                      result:successfull
                  })
              }
          })
      }
      if(request == 'find_freinds2'){
        const email = req.body.email
        user_functions.check_email(email,(err,user)=>{
            if(err) throw err
            if(user){
                res.json({
                      success:true,
                      found:user
                })
            }
        })
    }
    if(request=='get_freinds'){
        const email = req.body.email
        user_functions.check_email(email,(err,successfull)=>{
            if(err)throw err
            if(successfull){
                res.json({
                    success:true,
                    found:successfull
                })
            }
        })
    }
    if(request == 'update_profile'){
        const details = ({
             email :req.body.email,
         phone : req.body.email,
         occupation : req.body.occupation,
         website : req.body.website,
        firstname : req.body.firstname,
         secondname : req.body.secondname
        })
        user_functions.editprofile(details,(err,successfull)=>{
            if(err) throw err
            if(successfull){
                res.json({
                    success:true,
                    message:"Your Profile has successfully been updated"
                })
            }
        })
    }
})

router.get('/profile',passport.authenticate('jwt', { session: false }),(req,res)=>{
    res.json({
         user:req.user
    })
})

module.exports = router

