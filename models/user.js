const mongoose = require('mongoose')
const {  v1: uuidv1} = require('uuid');
const crypto=require('crypto');
const UserSchema = mongoose.Schema({
  name:{
    type:String,
    required:[true,'enter a name'],
    validate : [function (){
        this.name.length >= 2 
    },'enter valid name']
  },
  email:{
    type:String,
    validate : [function (email){
        return String(email)
        .toLowerCase()
        .match(
          /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        ) 
    },'enter valid email id'],
    required : [true,'enter email id']
  },
  date_added:{
   type:Date,
   default:Date.now()
  },
  password:{
      type:String,
      required: [true, 'Please enter a valid password'],
      minlength:[6,'Enter minimum 6 letters']
  },
  salt:{
      type:String,
  },
  invitation:{
    type:Boolean
  }
});

UserSchema.pre('save',function(next){
  this.salt = uuidv1();
  this.password = this.encryptPassword(this.password);
  next();
})

UserSchema.methods.encryptPassword=function(password){
    if(!password){
        return "No password"
    }
   try{ 
    return crypto.createHmac('sha1',this.salt).update(password).digest("hex");
   }
   catch(err){
       console.log(err);
       return "";
   }
}
UserSchema.methods.authenticate=function(pass){
   return  this.encryptPassword(pass) == this.password 
}

module.exports = mongoose.model("User",UserSchema);