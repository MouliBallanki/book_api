require("dotenv").config();


// framework
const express = require("express");
const mongoose = require("mongoose");

// importing microservices
const Books = require("./API/Book");
const Authors = require("./API/Author");
const Publications = require("./API/Publication"); 

// models
// const BookModel = require("./database/book");
// const AuthorModel = require("./database/author");
// const PublicationModel = require("./database/publication");
const { parse } = require("dotenv");


// initializing express
const shapeAI = express();

// configurations
shapeAI.use(express.json());

// connecting mongoose to our database
mongoose.connect(process.env.MONGO_URL , 
{
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true
}
)
.then(() => console.log("coonection established!!"));

// intializing micro services for a book
shapeAI.use("/book",Books);
shapeAI.use("/author",Authors);
shapeAI.use("/Publication",Publications);

shapeAI.listen(3000 ,() => console.log("server is runnig!!!"));

