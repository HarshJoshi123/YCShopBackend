const mongoose = require("mongoose");
const CartSchema = mongoose.Schema({
 userId:{
   type:mongoose.Schema.Types.ObjectId,ref:'User'
 },
 items:[{
     name:{
       type:String,
     },
     productId:{
       type:mongoose.Schema.Types.ObjectId,ref:'Product'
     },
     quantity:{
         type:Number,
         required:[true,'Enter quantity for this product'],
         min:[1,'Quantity cannot be less than 1'],
         default:1
        },
      cost : {
        type:Number
      }
 }]
 ,
 bill:{
     type:Number,
     required:true,
     default:0
 }

});

module.exports = mongoose.Schema("Cart",CartSchema);