let id = db.length + 1;
const db = require("./db/db.json");



module.exports = function (app) {
    app.get("/api/notes", function (req, res) {
        res.json(db);
    })


    app.post("/api/notes", function (req, res) {
        req.body.id = id++;
        db.push(req.body)
        fs.writeFile("./db/db.json", JSON.stringify(db), function (err, data) {
            if (err) throw err;
        })

        res.json(db);
    })

    app.delete("/api/notes/:id", function (req, res) {
        var getId = req.params.id;

        for (var i = 0; i < db.length; i++)
            if (db[i].id === parseInt(getId)) {
                db.splice(i, 1);
            }

        fs.writeFile("./db/db.json", JSON.stringify(db), function (err, data) {
            if (err) throw err;
        })
        res.json(db);
    })
};