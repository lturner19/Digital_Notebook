
const express = require("express");
const path = require("path");
const fs = require("fs");
const db = require("./db/db.json");
// Initialize the app and create a port
const app = express();
const PORT = process.env.PORT || 3000;
let id = db.length + 1;
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



//Setup api route
app.get("/api/notes", function (req, res) {
   
        res.json(db);
    
})

app.post("/api/notes", function(req, res) {
    
    req.body.id = id++; 

    db.push(req.body)
    fs.writeFile("./db/db.json",JSON.stringify(db), function(err, data){
        if(err) throw err;
    })
    res.json(db);
})

app.delete("/api/notes/:id", function(req,res){
var getId = req.params.id;
console.log(getId)
     
for (var i =0; i < db.length; i++)
   if (db[i].id === parseInt(getId)) {
      db.splice(i,1);
   }
/* 
     db.filter(db=>{
          
       return   parseInt(db.id) !==parseInt(getId)
    }) */
   console.log(db);


       fs.writeFile("./db/db.json", JSON.stringify(db), function (err, data) {
           if(err) throw err;
       })
       res.json(db);
})

// Start the server on the port
app.listen(PORT, () => console.log(`Listening on PORT: ${PORT}`));

