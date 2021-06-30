let books = [
    {
        ISBN : "12345ONE",
        title :"getting started with mern",
        authors:[1,2],
        language :"en",
        pubDate :"2021-07-07",
        numPage :225,
        category :["fiction","programming","web dev","tech"],
        publication :[1,2]

    },

    {
        ISBN : "12345TWO",
        title :"getting started with python",
        authors:[1,2,3],
        language :"en",
        pubDate :"2021-07-07",
        numPage :225,
        category :["fiction","programming","web dev","tech"],
        publication :[1]

    },

];

const authors = [
    {
        id :1,
        name :"mouli",
        books :["12345ONE"],
    },

    {
        id :2,
        name :"chinni",
        books :["12345ONE"],
    },

    {
        id :3,
        name :"ballanki",
        books :["12345THR","12345ONE"]
    }

];

const publications = [
    {
        id: 1,
        name :"chakra",
        books :["12345ONE","12345TWO"]
    },

    {
        id: 2,
        name :"mouli",
        books :["12345ONE","12345two"]
    }
    
];

module.exports = {books ,authors , publications};