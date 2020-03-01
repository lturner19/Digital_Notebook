//Setting up required dependencies
const express = require("express");
const path = require("path");
const fs = require("fs");

// Initialize the app and create a port
const app = express();
const PORT = process.env.PORT || 3000;

// Set up body parsing, static, and route middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));


//Setup to receive ajax GET calls and then responsd to them
app.get("/", function(req, res){//changed to a slash from (*) b/c html file has homepage as (/)
res.sendFile(path.join(__dirname, "../../index.html"))//renders homepage html page
})

app.get("/notes", function (req, res) {
    res.sendFile(path.join(__dirname, "../../notes.html"))//renders notes html page
})

//Reading db file and returning saved notes
app.get("/api/notes", function(req, res){
fs.readFile(path.join(__dirname, "../../db/db.json")), function (err,data) {
    if (err) {
        res.writeHead(300);
        return res.end("Sorry could not load page");
    }
    res.writeHead(300);
    res.send(data);
}
}) 

// Start the server on the port
app.listen(PORT, () => console.log(`Listening on PORT: ${PORT}`));

