const mongoose = require('mongoose')
const freind_request = mongoose.Schema({
    sender:{
        type:String,
        required:true
    },
    reciever:{
        type:String,
        required:true
    },
    status:{
        type:Number,
        required:true
    }
})
const insert = module.exports = mongoose.model('freind_request',freind_request)

//function to send freind request 
module.exports.send_request = function(details,callback){
  details.save(null,callback)
}
//function to check if the request has already been sent 
module.exports.check = function(sender,reciever,callback){
    insert.findOne({sender:sender,reciever:reciever},(err,sucessfull)=>{
        if(err) throw err
        else{
           
           callback(null,sucessfull)
        }
    })
}

//fnction to get freind requests for a user 
module.exports.get_requests = function(details,callback){
    console.log(details)
insert.find({reciever:details.reciever,status:details.status},(err,sucessfull)=>{
    if(err) throw err
    if(sucessfull){
        callback(null,sucessfull)
        
    }
})
}
module.exports.accept = function(sender,reciever,callback){
    insert.findOneAndUpdate({sender:sender,reciever:reciever},{
        $set:{
            status:1
        }
    },(err,sucessfull)=>{
        if(err) throw err
        else(
            callback(null,sucessfull)
        )
    })
}