require("dotenv").config();


// framework
const express = require("express");
const mongoose = require("mongoose");


// importing the database from the database folder 
const database = require("./database/index");

// models

const BookModel = require("./database/book");
const AuthorModel = require("./database/author");
const PublicationModel = require("./database/publication");
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


// API

/* 
route         /
decription   to get all books
acess        PUBLIC
parameters   NONE
method       get

*/

shapeAI.get("/" ,async (req ,res) =>{
    const getAllBooks = await BookModel.find();
    return res.json({getAllBooks});
});


/* 
route         /is
decription   to get specific book based on isbn
acess        PUBLIC
parameters   ISBN
method       get

*/

shapeAI.get("/is/:isbn" ,async (req , res) =>{
    const getSpecificBook = await BookModel.findOne({ISBN :req.params.isbn});
    // const getSpecificBook = database.books.filter((book) => book.ISBN === req.params.isbn);

    if(!getSpecificBook){
        res.json({error :`No BOOK found for the ISBN of ${req.params.isbn}`});
    }
    else{
        res.json({books : getSpecificBook});
    }
});



/* 
route         /c
decription   to get specific book based on a category
acess        PUBLIC
parameters   category
method       get

*/

shapeAI.get("/c/:category" ,async (req ,res) =>{

    const getSpecificBooks = await BookModel.findOne({category : req.params.category});

    // const getSpecificBooks = database.books.filter((book) => book.category.includes(req.params.category));

    if(!getSpecificBooks){
        res.json({error :`No BOOK found for the category of ${req.params.category}`});
    }
    else{
        res.json({books : getSpecificBooks});
    }
});



/* 
route         /c/is
decription   to get specific book based on a author
acess        PUBLIC
parameters   author
method       get

*/
shapeAI.get("/c/is/:id" ,async (req ,res) => {

    const getSpecificBooks = await BookModel.find({authors : req.params.id});
    // const getSpecificBooks = database.books.filter((book) => book.authors.includes(parseInt(req.params.id)));

    if(!getSpecificBooks){
        res.json({error :`No BOOK found for the author of ${req.params.id}`});
    }
    else{
        res.json({books : getSpecificBooks});
    }
});


/* 
route         /author
decription   to get all authors
acess        PUBLIC
parameters   authors
method       get

*/

shapeAI.get("/authors", async (req ,res) =>{
    const getAllAuthors = await AuthorModel.find();
    res.json({authors : getAllAuthors});
});



/* 
route         /author
decription   to get specific author 
acess        PUBLIC
parameters   author
method       get

*/

shapeAI.get("/authors/:author" ,async (req ,res) =>{
 
    const getSpecificAuthor = await AuthorModel.findOne({name : req.params.author});
    // const getSpecificAuthor = database.authors.filter((author) => author.name.includes(req.params.author));

    if(!getSpecificAuthor){
        res.json({error : `No author found by ${req.params.author}`});
    }

    else{
        res.json({author : getSpecificAuthor});
    }
});


/* 
route         /author
decription   to get specific author  based on A book
acess        PUBLIC
parameters   ISBN
method       get

*/

shapeAI.get("/author/:isbn" ,async (req ,res) =>{

    const getSpecificAuthors = await AuthorModel.find({books : req.params.isbn});
    // const getSpecificAuthors = database.authors.filter((author)=> author.books.includes(req.params.isbn));
    if(!getSpecificAuthors){
        res.json({error : `No author found by that ${req.params.isbn} ISBN number`});
    }
    else{
        res.json({authors : getSpecificAuthors});
    }
});





/* 
route         /publications
decription   to get all publications
acess        PUBLIC
parameters   p
method       get

*/


shapeAI.get("/publications" ,async (req ,res) =>{

    const getAllPublications = await PublicationModel.find();
    res.json({publications :getAllPublications});
});


/* 
route         /publications/is
decription   to get specific publications
acess        PUBLIC
parameters   pubname
method       get

*/

shapeAI.get("/publications/is/:pubname" ,async (req ,res) =>{
    const getSpecificPublication = await PublicationModel.findOne({ name : req.params.pubname});
    // const getSpecificPublications = database.publications.filter((pname) => pname.name.includes(req.params.pubname));

    if(!getSpecificPublication){
        res.json({error :`there is no publication found by the ${req.params.pubname}`});
    }
    else{
        res.json({publications :getSpecificPublication});
    }
});



/* 
route         /publications/
decription   to get specific publications by the book name
acess        PUBLIC
parameters   isbn
method       get

*/


shapeAI.get("/publications/:isbn" ,async (req ,res) =>{

    const getSpecificPublication = await PublicationModel.find({books : req.params.isbn});
    // const getSpecificPublications = database.publications.filter((pname) => pname.books.includes(req.params.isbn));

    if(!getSpecificPublication){
        res.json({error :`there is no publication found by the ${req.params.isbn}`});
    }
    else{
        res.json({publication :getSpecificPublication});
    }
});


/* 
route         /book/new
decription   to add new book
acess        PUBLIC
parameters   NONE
method       POST

*/

shapeAI.post("/book/new" ,async (req ,res) =>{
    const {newBook} = req.body;
    BookModel.create(newBook);

    return res.json({message: "book was added "});
});


/* 
route         /author/new
decription   to add new author
acess        PUBLIC
parameters   NONE
method       POST

*/

shapeAI.post("/author/new" ,(req , res) =>{
    const { newAuthor } = req.body;
    AuthorModel.create(newAuthor);
    
    return res.json({ message : "author was added"});
});

/* 
route         /publications/new
decription   to add new publications
acess        PUBLIC
parameters   NONE
method       POST

*/

shapeAI.post("/publication/new" , (req , res) =>{
    const { newPublication } = req.body;
    PublicationModel.create(newPublication);

    return res.json({Message : "new publicaton was added"});
});


/* 
route         /book/update
decription   to add new title
acess        PUBLIC
parameters   isbn
method       PUT

*/


shapeAI.put("/book/update/:isbn" , async (req , res ) =>{

    const updatedBook = await BookModel.findOneAndUpdate(
        {
            ISBN : req.params.isbn,
        },
        {
            title :req.body.newTitle,
        },
        {
            new: true,
        }
    );
    // database.books.forEach((book) =>{
    //     if (book.ISBN === req.params.isbn){
    //         book.title = req.body.newTitle;

    //         return;
    //     }
    // });

    return res.json({ Books : updatedBook });
});

/* 
route         /book/author/update
decription   to add new author
acess        PUBLIC
parameters   isbn
method       PUT

*/

shapeAI.put("/book/author/update/:isbn" , async (req ,res) =>{
    // update book details 

    const updatedBooks = await BookModel.findOneAndUpdate(
        {
            ISBN:req.params.isbn,
        },
        {
            $addToSet: {
                authors : req.body.newAuthor,
            }
        },
        {
            new:true,
        }
    );
    // database.books.forEach((book) =>{
    //     if(book.ISBN === req.params.isbn){
    //         book.authors.push(req.body.newAuthor);
    //     }
    // });

    // update author details

    const updatedAuthors = await AuthorModel.findOneAndUpdate(
        {
            id :req.body.newAuthor,
        },
        {
            $addToSet : {
                books : req.params.isbn,
            }
        },
        {
            new :true,
        }
    );
    // database.authors.forEach((author) =>{
    //     if(author.id === req.body.newAuthor){
    //         author.books.push(req.params.isbn);
    //     }
    // });

    return res.json({ books : updatedBooks , authors : updatedAuthors , message : "new author was added "});
});



/* 
route         /author/update/
decription   to add new author
acess        PUBLIC
parameters   num
method       PUT

*/

shapeAI.put("/author/update/:c" , async (req , res ) =>{

    const updatedAuthor = await AuthorModel.findOneAndUpdate(
        {
            id :req.params.c,
        },
        {
            name : req.body.newAuthor,
        },
        {
            new: true,
        }
    );
    // database.authors.forEach((author) =>{
    //     if (author.id === parseInt(req.params.c)){
    //         author.name = req.body.newTitle;

    //         return;
    //     }
    // });

    return res.json({ Authors : updatedAuthor });
});




/* 
route         /publications/update/
decription   to update publications
acess        PUBLIC
parameters   c
method       PUT

*/


shapeAI.put("/publications/update/:id" , async (req , res ) =>{

    const updatedPublications = await  PublicationModel.findOneAndUpdate(
        {
            id :req.params.id,
        },
        {
            name : req.body.newTitle,
        },
        {
            new :true,
        }
    );

    return res.json({ publications : updatedPublications});
    // database.publications.forEach((publication) =>{
    //     if (publication.id === parseInt(req.params.id)){
    //         publication.name = req.body.newTitle;

    //         return;
    //     }
    // });

    // return res.json({ publications : database.publications });
});

/* 
route         /publications/update/book
decription   update/add new book to an publication
acess        PUBLIC
parameters   isbn , pubId
method       PUT

*/

shapeAI.put("/publications/update/book/:isbn/:pubId", async (req, res) =>{

    // update publications
    const updatedPublications = await PublicationModel.findOneAndUpdate(
        {
            id :req.params.pubId,
        },
        {
            $addToSet:{
                books :req.params.isbn,
            },
        },
        {
            new:true,
        }
    );
    // database.publications.forEach((publication) =>{
    //     if(publication.id === parseInt(req.params.pubId)){
    //         return publication.books.push(req.params.isbn);
    //     }
    // });

    // update books

    const updatedBooks = await BookModel.findOneAndUpdate(
        {
            ISBN:req.params.isbn,
        },
        {
            $addToSet:{
                publication:req.params.pubId,
            },
        },
        {
            new:true,
        }
    );
    // database.books.forEach((book) =>{
    //     if(book.ISBN === req.params.isbn){
    //         book.publication.push(parseInt(req.params.pubId));
    //         return;
    //     }
    // });

    res.json({ message : "added..", books :updatedBooks , publications : updatedPublications });
});



/* 
route         /book/delete
decription   to delete a book
acess        PUBLIC
parameters   isbn
method       DELETE

*/

shapeAI.delete("/book/delete/:isbn" , async (req ,res) =>{

    const updatedBookDatabase = await BookModel.findOneAndDelete(
        {
            ISBN:req.params.isbn,
        },
    );
    // const updatedBookDatabase = database.books.filter((book) => book.ISBN !== req.params.isbn);

    // database.books = updatedBookDatabase;

    return res.json({ books :updatedBookDatabase});
});

/* 
route         /book/delete/author
decription   to delete a author from the book
acess        PUBLIC
parameters   isbn , authorId
method       DELETE

*/

shapeAI.delete("/book/delete/author/:isbn/:authorId" , async (req ,res) =>{

    const updatedBookDatabase = await BookModel.findOneAndUpdate(
        {
            ISBN:req.params.isbn,
        },
        {
            $pull:{
                authors :parseInt(req.params.authorId),
            }
        },
        {
            new:true,
        }
    );
    // database.books.forEach((book) =>{
    //     if(book.ISBN === req.params.isbn){
    //         const newAuthorList = book.authors.filter((author) => author !== parseInt(req.params.authorId));

    //         book.authors = newAuthorList;
    //         return ;
    //     }
        
    // });

    const updatedAuthorDatabase = await AuthorModel.findOneAndUpdate(
        {
            id:parseInt(req.params.authorId),
        },

        {
            $pull:{
                books:req.params.isbn,
            }
        },
        {
            new:true,
        }
    );
    // database.authors.forEach((author) => {
    //     if(author.id === parseInt(req.params.authorId)){
    //         const newBookList = author.books.filter((book) => book !== req.params.isbn)

    //         author.books = newBookList ;
    //         return;
    //     }
    // });

    return res.json({ books :updatedBookDatabase , authors : updatedAuthorDatabase});

});

/* 
route         /author/delete/
decription   to delete a author
acess        PUBLIC
parameters   authorId
method       DELETE

*/

shapeAI.delete("/author/delete/:authorId" , async (req ,res) =>{

    const updatedAuthorDatabase = await AuthorModel.findOneAndDelete(
        {
            id :parseInt(req.params.authorId),
        },
    );

    // const newAuthorDatabase = database.authors.filter((author) => author.id !== parseInt(req.params.authorId))

    // database.authors = newAuthorDatabase;

    res.json({ authors : updatedAuthorDatabase});
});

/* 
route         /publication/delete/
decription   to delete a publication
acess        PUBLIC
parameters   pubId
method       DELETE

*/

shapeAI.delete("/publication/delete/:pubId" , async (req ,res) =>{

    const updatedPublication = await PublicationModel.findOneAndDelete(
        {
            id:parseInt(req.params.pubId),
        }
    );
    // const newPublicationDatabase = database.publications.filter((publication) => publication.id !== parseInt(req.params.pubId))

    // database.publications = newPublicationDatabase;

    res.json({ publications : updatedPublication});
});

/* 
route         /publication/delete/book
decription   delete a book from publication
acess        PUBLIC
parameters   isbn ,pubId
method       DELETE

*/

shapeAI.delete("/publication/delete/book/:isbn/:pubId", async (req ,res) =>{
    // update publication books database
    const updatedPublications = await PublicationModel.findOneAndUpdate(
        {
            id:parseInt(req.params.pubId),
        },
        {
            $pull:{
                books :req.params.isbn,
            }
        },
        {
            new:true,
        }
    );
    // database.publications.forEach((publication) =>{
    //     if(publication.id ===parseInt(req.params.pubId)){
    //         const updatedBooks = publication.books.filter((book) => book !== req.params.isbn);

    //         publication.books = updatedBooks;
    //         return ;
    //     }
    // });

    // update publication in book database

    const updatedBookDatabase = await BookModel.findOneAndUpdate(
        {
            ISBN:req.params.isbn,
        },
        {
            $pull:{
                publication:req.params.pubId,
            }
        },
        {
            new:true,
        }
    );

    // database.books.forEach((book) =>{
    //     if(book.ISBN === req.params.isbn){
    //         const updatedPublication = book.publication.filter((pub) => 
    //         pub !== parseInt(req.params.pubId))
    //         book.publication = updatedPublication ;
    //         return;
    //     }
    // });

    res.json({ books : updatedBookDatabase, publications : updatedPublications});
});



shapeAI.listen(3000 ,() => console.log("server is runnig!!!"));

