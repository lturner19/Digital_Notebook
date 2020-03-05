const db = require("../db/db.json")
const fs = require("fs");
let id = db.length + 1; //Each new note will generate a new id #

//Setup api routes
module.exports = function (app) {

    //handles api get requests
    app.get("/api/notes", function (req, res) {
        //will respond with the notes in json form
        res.json(db);
    })

    //handles users making/saving notes to db
    app.post("/api/notes", function (req, res) {
        req.body.id = id++; //each note will have a unique id#(only part of db.json array, not visible to user)
        //pushing new notes to the db array
        db.push(req.body)

        fs.writeFile("./db/db.json", JSON.stringify(db), function (err, data) {
            if (err) throw err;
        })
        res.json(db);
    })

    app.delete("/api/notes/:id", function (req, res) {
        //using the id key to select a particular note and delete it from the db
        var getId = req.params.id;

        for (var i = 0; i < db.length; i++){
            //if the db id equals the getId number
            if (db[i].id === parseInt(getId)) {
                //then remove 1 element from the array
                db.splice(i, 1);
            }
        }
        //writing data to the db.json file
        fs.writeFile("./db/db.json", JSON.stringify(db), function (err, data) {
            if (err) throw err;
        })
        res.json(db);
    })
};