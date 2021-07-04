const Router = require("express").Router();

// models
const BookModel = require("../../database/book");



/* 
route         /
decription   to get all books
acess        PUBLIC
parameters   NONE
method       get

*/

Router.get("/" ,async (req ,res) =>{
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

Router.get("/is/:isbn" ,async (req , res) =>{
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

Router.get("/c/:category" ,async (req ,res) =>{

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
Router.get("/c/is/:id" ,async (req ,res) => {

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
route         /book/new
decription   to add new book
acess        PUBLIC
parameters   NONE
method       POST

*/

Router.post("/new" ,async (req ,res) =>{
    const {newBook} = req.body;
    BookModel.create(newBook);

    return res.json({message: "book was added "});
});

/* 
route         /book/update
decription   to add new title
acess        PUBLIC
parameters   isbn
method       PUT

*/


Router.put("/update/:isbn" , async (req , res ) =>{

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

Router.put("/author/update/:isbn" , async (req ,res) =>{
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
route         /book/delete
decription   to delete a book
acess        PUBLIC
parameters   isbn
method       DELETE

*/

Router.delete("/delete/:isbn" , async (req ,res) =>{

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

Router.delete("/delete/author/:isbn/:authorId" , async (req ,res) =>{

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


module.exports = Router;