//Dependency setup
const express = require("express");


// Initialize the app and create a port
const app = express();
const PORT = process.env.PORT || 3000;

// Set up body parsing, static, and route middleware*
app.use(express.urlencoded({ extended: true }));//allows recognition of incoming request objects as strings or arrays, true = nested objects ok
app.use(express.json()); //translates to json for server to read
app.use(express.static("public"));//makes public local host


require("./routes/apiRoutes")(app);
require("./routes/htmlRoutes")(app);

// Start the server on the port
app.listen(PORT, function(){
    console.log("App listening on PORT: " + PORT);
});


//*processes between request and sending the response in application method