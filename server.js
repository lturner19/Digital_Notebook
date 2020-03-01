
const express = require("express");
const path = require("path");
const fs = require("fs");

// Initialize the app and create a port
const app = express();
const PORT = process.env.PORT || 3000;

// Set up body parsing, static, and route middleware

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));


//Setup html routes
app.get("/", function (req, res) {//changed to a slash from (*) b/c html file has homepage as (/)
    res.sendFile(path.join(__dirname, "./public/index.html"))//renders homepage html page
})

app.get("/notes", function (req, res) {
    res.sendFile(path.join(__dirname, "./public/notes.html"))//renders notes html page
})






// Start the server on the port
app.listen(PORT, () => console.log(`Listening on PORT: ${PORT}`));

