const mongoose = require("mongoose");

// creating the schema

const BookSchema = mongoose.Schema(
    {
        ISBN : String,
        title :String,
        authors:[Number],
        language :String,
        pubDate :String,
        numPage :Number,
        category :[String],
        publication :[Number]
    }
);

// create a book model
const  BookModel = mongoose.model("books", BookSchema);

module.exports = BookModel;

