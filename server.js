// requires
var express = require("express");
var mongoose = require("mongoose");
var expressHandlebars = require("express-handlebars");
var bodyParser = require("body-parser");

// port setup
var PORT = process.env.PORT || 3000;

// express app instance
var app = express();

// setup express router
var router = express.Router();

// require the routes file and pass the router object
require("./config/routes")(router);

// set static folder
app.use(express.static(__dirname + "/public"));

// connect handlebars to the express app
app.engine("handlebars", expressHandlebars({
    defaultLayout: "main"
}));
app.set("view engine", "handlebars");

// bodyparser middleware
app.use(bodyParser.urlencoded({
    extended: false
}));

// use router middleware
app.use(router);

// if deployed, use the deployed database, otherwise the local database
var db = process.env.MONOGODB_URI || "mongodb://localhost/mongoHeadLines";

// connect to mongoose from the database
mongoose.connect(db, function(error) {
    if (error) {
        console.log(error);
    }
    else {
        console.log("mongoose connection is successful");
    }
});

// listen on the port
app.listen(PORT, function() {
    console.log("Listening on port: " + PORT);
});