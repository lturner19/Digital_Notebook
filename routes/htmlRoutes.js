
//path package to get the correct file path for our html
const path = require("path");

//HTML requests can be exported and used by the server file
module.exports = function (app) {
    // HTML GET Requests
    
    //renders notes html page
    app.get("/notes", function (req, res) {
        res.sendFile(path.join(__dirname, "../public/notes.html"))
    })

    app.get("*", function (req, res) {
        //renders homepage html page
        res.sendFile(path.join(__dirname, "../public/index.html"))
    })

}