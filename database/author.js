const mongoose = require("mongoose");

// create a schema
const AuthorSchema = mongoose.Schema(
    {
        id :Number,
        name :String,
        books :[String]
    }
);

const AuthorModel = mongoose.model(AuthorSchema);

module.exports = AuthorModel;