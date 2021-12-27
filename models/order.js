const mongoose = require('mongoose')
const OrderSchema = mongoose.Schema({
 userId:{
   type:mongoose.Schema.Types.ObjectId,ref:'User'
 },
 items:[{
     productId:{
       type:mongoose.Schema.Types.ObjectId,ref:'Product'
     },
     quantity:{
         type:Number,
         required:[true,'Enter quantity for this product'],
         min:[1,'Quantity cannot be less than 1'],
         default:1
        }
 }],
 bill:{
     type:Number,
     required:true,
     default:0
 },
 date_added:{
     type:Date,
     default:Date.now()
 }
});

module.exports = mongoose.model("Order", OrderSchema);