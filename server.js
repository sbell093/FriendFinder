const bodyParser = require('body-parser');
const express = require('express');
const path = require('path');

//Tells node to create express server
var app = express();
var PORT = process.env.PORT || 8080;


// Lets express app handle data parsing
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));


require("./app/routing/apiRoutes.js")(app);
require("./app/routing/htmlRoutes.js")(app);


app.listen(PORT, function() {
    console.log("App listening on PORT: " + PORT);
});