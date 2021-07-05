const mongoose = require("mongoose");

// create a publication schema

const PublicationSchema = mongoose.Schema(
    {
        id :{
            type:Number,
            required:true,
            maxLength:2,
        },
        name :{
            type:String,
            required:true,
            minLength:15,
            maxLength:18,
        },
        books :{
            type:[String],
            required:true,
        }
    });

const PublicationModel = mongoose.model("publications" ,PublicationSchema);

module.exports = PublicationModel;