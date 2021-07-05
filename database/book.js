const mongoose = require("mongoose");

// creating the schema

const BookSchema = mongoose.Schema(
    {
        ISBN :{
            type:String,
            required:true,
            minLength:8,
            maxLength:10,
        },
        title :{
            type:String,
            required:true,
            minLength:20,
            maxLength:30,
        },
        authors:{
            type:[Number],
            required:true,
        },
        language :{
            type:String,
            required:true,
        },
        pubDate :{
            type:String,
            required:true,
        },
        numPage :{
            type:Number,
            required:true,
        },
        category :{
            type:[String],
            required:true,
        },
        publication :{
            type:[Number],
            required:true,
        }
    }
);

// create a book model
const  BookModel = mongoose.model("books", BookSchema);

module.exports = BookModel;

