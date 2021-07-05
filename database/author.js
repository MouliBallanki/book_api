const mongoose = require("mongoose");

// create a schema
const AuthorSchema = mongoose.Schema(
    {
        id :{
            type:Number,
            required:true,
            maxLength:3,
        },
        name :{
            type:String,
            required:true,
            minLength:10,
            maxLength:11,
        },
        books :{
            type:[String],
            required:true,
        }
    }
);

const AuthorModel = mongoose.model("authors", AuthorSchema);

module.exports = AuthorModel;