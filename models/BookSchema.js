const mongoose = require('mongoose');

const BookSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        minlength:3,
        trim:true
    },
    price:{
        type:Number,
        required:true,
        minlength:10000,
        trim:true
    },
    authors:{
        type:String,
        required:true,
        minlength:3,
        trim:true
    },
    release_date:{
        type:Date,
        required:true,
        trim:true
    },
    stock:{
        type:Number,
        required:true,
        trim:true
    }
});

module.exports = mongoose.model('Book', BookSchema);