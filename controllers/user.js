const User = require("../models/user")
const {  v1: uuidv1} = require('uuid');
const jwt = require('jsonwebtoken')
exports.Signup = async (req, res) => {
    try {
        const userExists = await User.findOne({ email: req.body.email })
        if (userExists) {
         return res.status(403).json({err:"email is taken"}) 
        }
        else {
         let paswd = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{7,30}$/;
         if(!req.body.password.match(paswd)){
            return res.status(400).json({
                err:"Password should contain a special character,a number and 7 to 30 characters"
            })
         }   
           await User.create(req.body);
           return res.status(200).json({message:"user created"});
        }
    }
    catch (err) {
        console.log("SIGNUP :",err);
      return res.status(401).json({ err: "error during signup" })
    }
}
exports.Login = async (req, res) => {
    try{
       let user = await User.findOne({email:req.body.email});
       if(!user.authenticate(req.body.password)){
           return res.status(401).json({
               err:"Email and password does not match"
           })
       }
       
       const token = jwt.sign({email:user.email,name:user.name},process.env.secretKey,{expiresIn:'86400s'});
       return res.status(200).json({message:'token',token:token,user:{
           name:user.name,
           email:user.email,
       }});
    }
    catch(err){
        console.log(err)
        return res.status(401).json({
            err: "User with that email doesnt exist"
        })
    }

}

exports.authMid=(req,res,next)=>{
    let token = req.headers.authorization;
    //token = token.split(' ')[1];
    
    jwt.verify(token,process.env.secretKey,function(err,decrpyt){
        if(err){
          res.status(401).json({err:"Invalid token"})
        }
        else{
        next();
        }
    })
}

exports.getAll= async ( req,res)=>{
  
    try{
       let users = await User.find();
       return res.status(200).json({
           message:"fetched all users",
           data:users
       })
    } 
    catch(err){

        return res.json(400).json({err:"error while fetching all users"});
    }
 

}