const mongoose = require('mongoose')

const ProductSchema = mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: true
    },
    cost: {
        type: Number,
        trim: true,
        required: true
    },
    category: {
        type: String,
        required: true,
        trim: true
    },
    description:{
        type:String
    },
    product: {
        type: String,
        required: true,
        trim: true
    },
    photo: {
        data: Buffer,      
        contentType: String,
    },
    date_added: {
        type: Date,
        default: Date.now
    }
});
module.exports = mongoose.model('Product', ProductSchema);