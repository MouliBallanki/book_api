const Router = require("express").Router();

// models
const AuthorModel = require("../../database/author");

/* 
route         /author
decription   to get all authors
acess        PUBLIC
parameters   authors
method       get

*/

Router.get("/", async (req ,res) =>{
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

Router.get("/:name" ,async (req ,res) =>{
 
    const getSpecificAuthor = await AuthorModel.findOne({name : req.params.name});
    // const getSpecificAuthor = database.authors.filter((author) => author.name.includes(req.params.author));

    if(!getSpecificAuthor){
        res.json({error : `No author found by ${req.params.name}`});
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

Router.get("/:isbn" ,async (req ,res) =>{

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
route         /author/new
decription   to add new author
acess        PUBLIC
parameters   NONE
method       POST

*/

Router.post("/new" ,(req , res) =>{
    const { newAuthor } = req.body;
    AuthorModel.create(newAuthor);
    
    return res.json({ message : "author was added"});
});

/* 
route         /author/update/
decription   to add new author
acess        PUBLIC
parameters   num
method       PUT

*/

Router.put("/update/:c" , async (req , res ) =>{

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
route         /author/delete/
decription   to delete a author
acess        PUBLIC
parameters   authorId
method       DELETE

*/

Router.delete("/delete/:authorId" , async (req ,res) =>{

    const updatedAuthorDatabase = await AuthorModel.findOneAndDelete(
        {
            id :parseInt(req.params.authorId),
        },
    );

    // const newAuthorDatabase = database.authors.filter((author) => author.id !== parseInt(req.params.authorId))

    // database.authors = newAuthorDatabase;

    res.json({ authors : updatedAuthorDatabase});
});

module.exports = Router;