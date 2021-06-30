require("dotenv").config();

const express = require("express");

const mongoose = require("mongoose");


// importing the database from the database folder 
const database = require("./database/index");


// initializing express
const shapeAI = express();


// configurations
shapeAI.use(express.json());

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

shapeAI.get("/" ,(req ,res) =>{
    return res.json({books :database.books});
});


/* 
route         /is
decription   to get specific book based on isbn
acess        PUBLIC
parameters   ISBN
method       get

*/

shapeAI.get("/is/:isbn" ,(req , res) =>{
    const getSpecificBook = database.books.filter((book) => book.ISBN === req.params.isbn);

    if(getSpecificBook.length === 0){
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

shapeAI.get("/c/:category" ,(req ,res) =>{
    const getSpecificBooks = database.books.filter((book) => book.category.includes(req.params.category));

    if(getSpecificBooks.length === 0){
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
shapeAI.get("/c/is/:id" ,(req ,res) => {
    const getSpecificBooks = database.books.filter((book) => book.authors.includes(parseInt(req.params.id)));

    if(getSpecificBooks.length === 0){
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

shapeAI.get("/authors", (req ,res) =>{
    res.json({authors :database.authors});
});



/* 
route         /author
decription   to get specific author 
acess        PUBLIC
parameters   author
method       get

*/

shapeAI.get("/authors/:author" ,(req ,res) =>{
 
    const getSpecificAuthor = database.authors.filter((author) => author.name.includes(req.params.author));

    if(getSpecificAuthor.length ===0){
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

shapeAI.get("/author/:isbn" ,(req ,res) =>{
    const getSpecificAuthors = database.authors.filter((author)=> author.books.includes(req.params.isbn));
    if(getSpecificAuthors.length === 0){
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


shapeAI.get("/publications" ,(req ,res) =>{
    res.json({publications :database.publications});
});


/* 
route         /publications/is
decription   to get specific publications
acess        PUBLIC
parameters   pubname
method       get

*/

shapeAI.get("/publications/is/:pubname" ,(req ,res) =>{
    const getSpecificPublications = database.publications.filter((pname) => pname.name.includes(req.params.pubname));

    if(getSpecificPublications.length === 0){
        res.json({error :`there is no publication found by the ${req.params.pubname}`});
    }
    else{
        res.json({publications :getSpecificPublications});
    }
});



/* 
route         /publications/
decription   to get specific publications by the book name
acess        PUBLIC
parameters   isbn
method       get

*/


shapeAI.get("/publications/:isbn" ,(req ,res) =>{
    const getSpecificPublications = database.publications.filter((pname) => pname.books.includes(req.params.isbn));

    if(getSpecificPublications.length === 0){
        res.json({error :`there is no publication found by the ${req.params.isbn}`});
    }
    else{
        res.json({publications :getSpecificPublications});
    }
});


/* 
route         /book/new
decription   to add new book
acess        PUBLIC
parameters   NONE
method       POST

*/

shapeAI.post("/book/new" ,(req ,res) =>{
    const {newBook} = req.body;
    database.books.push(newBook);

    return res.json({books : database.books , message : "book was added "});
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
    database.authors.push(newAuthor);
    
    return res.json({authors : database.authors  , message : "author was added"});
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
    database.publications.push(newPublication);

    return res.json({publications : database.publications , Message : "new publicaton was added"});
});


/* 
route         /book/update
decription   to add new publications
acess        PUBLIC
parameters   isbn
method       PUT

*/


shapeAI.put("/book/update/:isbn" , (req , res ) =>{
    database.books.forEach((book) =>{
        if (book.ISBN === req.params.isbn){
            book.title = req.body.newTitle;

            return;
        }
    });

    return res.json({ Books : database.books });
});

/* 
route         /book/author/update
decription   to add new author
acess        PUBLIC
parameters   isbn
method       PUT

*/

shapeAI.put("/book/author/update/:isbn" , (req ,res) =>{
    // update book details 
    database.books.forEach((book) =>{
        if(book.ISBN === req.params.isbn){
            book.authors.push(req.body.newAuthor);
        }
    });

    // update author details
    database.authors.forEach((author) =>{
        if(author.id === req.body.newAuthor){
            author.books.push(req.params.isbn);
        }
    });

    return res.json({ books : database.books , authors : database.authors , message : "new author was added "});
});



/* 
route         /author/update/
decription   to add new author
acess        PUBLIC
parameters   num
method       PUT

*/

shapeAI.put("/author/update/:c" , (req , res ) =>{
    database.authors.forEach((author) =>{
        if (author.id === parseInt(req.params.c)){
            author.name = req.body.newTitle;

            return;
        }
    });

    return res.json({ Authors : database.authors });
});




/* 
route         /publications/update/
decription   to update publications
acess        PUBLIC
parameters   c
method       PUT

*/


shapeAI.put("/publications/update/:c" , (req , res ) =>{
    database.publications.forEach((publication) =>{
        if (publication.id === parseInt(req.params.c)){
            publication.name = req.body.newTitle;

            return;
        }
    });

    return res.json({ publications : database.publications });
});

/* 
route         /publications/update/book
decription   update/add new book to an publication
acess        PUBLIC
parameters   isbn , pubId
method       PUT

*/

shapeAI.put("/publications/update/book/:isbn/:pubId", (req, res) =>{
    // update publications
    database.publications.forEach((publication) =>{
        if(publication.id === parseInt(req.params.pubId)){
            return publication.books.push(req.params.isbn);
        }
    });

    // update books
    database.books.forEach((book) =>{
        if(book.ISBN === req.params.isbn){
            book.publication.push(parseInt(req.params.pubId));
            return;
        }
    });

    res.json({message : "new publication added" , books : database.books , publications : database.publications});
});



/* 
route         /book/delete
decription   to delete a book
acess        PUBLIC
parameters   isbn
method       DELETE

*/

shapeAI.delete("/book/delete/:isbn" , (req ,res) =>{
    const updatedBookDatabase = database.books.filter((book) => book.ISBN !== req.params.isbn);

    database.books = updatedBookDatabase;

    return res.json({ books :database.books});
});

/* 
route         /book/delete/author
decription   to delete a author from the book
acess        PUBLIC
parameters   isbn , authorId
method       DELETE

*/

shapeAI.delete("/book/delete/author/:isbn/:authorId" , (req ,res) =>{
    database.books.forEach((book) =>{
        if(book.ISBN === req.params.isbn){
            const newAuthorList = book.authors.filter((author) => author !== parseInt(req.params.authorId));

            book.authors = newAuthorList;
            return ;
        }
        
    });


    database.authors.forEach((author) => {
        if(author.id === parseInt(req.params.authorId)){
            const newBookList = author.books.filter((book) => book !== req.params.isbn)

            author.books = newBookList ;
            return;
        }
    });

    return res.json({ books :database.books , authors : database.authors});

});

/* 
route         /author/delete/
decription   to delete a author
acess        PUBLIC
parameters   authorId
method       DELETE

*/

shapeAI.delete("/author/delete/:authorId" , (req ,res) =>{
    const newAuthorDatabase = database.authors.filter((author) => author.id !== parseInt(req.params.authorId))

    database.authors = newAuthorDatabase;

    res.json({ authors : database.authors});
});

/* 
route         /publication/delete/
decription   to delete a publication
acess        PUBLIC
parameters   pubId
method       DELETE

*/

shapeAI.delete("/publication/delete/:pubId" , (req ,res) =>{
    const newPublicationDatabase = database.publications.filter((publication) => publication.id !== parseInt(req.params.pubId))

    database.publications = newPublicationDatabase;

    res.json({ publications : database.publications});
});

/* 
route         /publication/delete/book
decription   delete a book from publication
acess        PUBLIC
parameters   isbn ,pubId
method       DELETE

*/

shapeAI.delete("/publication/delete/book/:isbn/:pubId", (req ,res) =>{
    // update publication books database
    database.publications.forEach((publication) =>{
        if(publication.id ===parseInt(req.params.pubId)){
            const updatedBooks = publication.books.filter((book) => book !== req.params.isbn);

            publication.books = updatedBooks;
            return ;
        }
    });

    // update publication in book database

    database.books.forEach((book) =>{
        if(book.ISBN === req.params.isbn){
            const updatedPublication = book.publication.filter((pub) => 
            pub !== parseInt(req.params.pubId))
            book.publication = updatedPublication ;
            return;
        }
    });

    res.json({ books : database.books , publications : database.publications});
});



shapeAI.listen(3000 ,() => console.log("server is runnig!!!"));

