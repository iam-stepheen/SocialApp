const mongoose = require('mongoose')
var bcrypt = require('bcryptjs');
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
        required:false
    },
    coverpicture:{
        type:String,
        required:false
    }
})

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
        if(succesfull){
            callback(null,succesfull)
        }
    })
}