const Router = require("express").Router();

// models
const PublicationModel = require("../../database/publication");




/* 
route         /publications
decription   to get all publications
acess        PUBLIC
parameters   p
method       get

*/


Router.get("/" ,async (req ,res) =>{

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

Router.get("/is/:pubname" ,async (req ,res) =>{
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


Router.get("/:isbn" ,async (req ,res) =>{

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
route         /publications/new
decription   to add new publications
acess        PUBLIC
parameters   NONE
method       POST

*/

Router.post("/new" , (req , res) =>{
    const { newPublication } = req.body;
    PublicationModel.create(newPublication);

    return res.json({Message : "new publicaton was added"});
});









/* 
route         /publications/update/
decription   to update publications
acess        PUBLIC
parameters   c
method       PUT

*/


Router.put("/update/:id" , async (req , res ) =>{

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

Router.put("/update/book/:isbn/:pubId", async (req, res) =>{

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
route         /publication/delete/
decription   to delete a publication
acess        PUBLIC
parameters   pubId
method       DELETE

*/

Router.delete("/delete/:pubId" , async (req ,res) =>{

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

Router.delete("/delete/book/:isbn/:pubId", async (req ,res) =>{
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

module.exports = Router;