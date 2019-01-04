const mongoose = require('mongoose')
var bcrypt = require('bcryptjs');
var timestamps = require('mongoose-timestamp');
const user_details = mongoose.Schema({
    firstname:{
        type:String,
        required:true,
    },
    secondname:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
    },
    password:{
        type:String,
        required:true,
    },
    activated:{
        type:String,
        required:true,
    },
    freinds:{
        type:Array,
        required:true,
    },
    profilepicture:{
        type:String,
        required:true
    },
    coverpicture:{
        type:String,
        required:true
    },
    gender:{
        type:String,
        required:true
    },
    occupation:{
        type:String,
        required:true},
    website:{
        type:String,
        required:true
    },
    phone:{
        type:String,
        required:true
    },
    education:{
        type:Array,
        required:true
    },
    fullname:{
        type:String,
        required:true
    }
    
})

user_details.plugin(timestamps);
const insert = module.exports= mongoose.model('Users',user_details)

//function to register users into db

module.exports.register = function(details,callback){
    bcrypt.genSalt(10, function(err, salt) {
        bcrypt.hash(details.password, salt, function(err, hash) {
            if(err) throw err 
            details.password = hash
            details.save(null,callback)
        });
        
    });
    
}

//function to get email
module.exports.check_email = function(email,callback){
    const query = {email:email}
    insert.findOne(query,callback)

}

//fuction to compare passwords 
module.exports.compare_password= function(password,hash,callback){
    bcrypt.compare(password, hash, function(err, res) {
       if(err) throw err
       callback(null,res)
    });
}

//function to upload profile picture 
module.exports.profile_picture = function(id,picturename,callback){
    insert.findByIdAndUpdate(id,{$set:{profilepicture:picturename}},(err,succesfull)=>{
        if(err) throw err
        else{
            callback(null,succesfull)
            console.log(succesfull)
        }
    })
}

module.exports.accept_freindrequest = function(sender,reciever,callback){
 //console.log(sender,reciever)
  insert.findOne({email:sender},(err,user)=>{
      if(err) throw err
      if(user){
          insert.updateMany({email:reciever},{
              $push:{
                  freinds:{"firstname":user.firstname,"secondname":user.secondname,"email":user.email}
              }
          },(err,succesfull)=>{
              if(err) throw err
              if(succesfull){
                insert.findOne({email:reciever},(err,users)=>{
                    if(err) throw err
                    if(users){
                        console.log({firstname:users.firstname,secondname:users.secondname,email:users.email})
                        insert.updateOne({email:sender},{
                            $push:{
                                freinds:{firstname:users.firstname,secondname:users.secondname,email:users.email}
                
                            }
                        },(err,succesfull)=>{
                            if(err) throw err
                            if(succesfull){
                                callback(null,succesfull)
                            }
                        })
                    }
                })
              }
          })
         
      }
  })


}

module.exports.editprofile = function(details,callback){
    insert.findOneAndUpdate({email:details.email},{
        $set:{
            firstname:details.firstname,secondname:details.secondname,phone:details.phone,occupation:details.occupation,website:details.website
        }
    },(err,succesfull)=>{
        if(err) throw err;
        if(succesfull){
            callback(null,succesfull)
        }
        
    })
}

module.exports.check_name = function(name,callback){
    insert.find({fullname:name},(err,succesfull)=>{
        if (err) throw err
        else{
            callback(null,succesfull)
        }
    })
   
}