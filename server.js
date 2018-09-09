//NPM imports
var express = require("express");
var mongoose = require("mongoose");
var cheerio = require("cheerio");
var request = require("request");
var bodyParser = require("body-parser");
var xhb = require("express-handlebars");

//import models
var db = require("./models");

//initialize express
var app = express();

//if deployed, use deployed port, otherwise use 3000
var PORT = process.env.PORT || 3000;

//if deployed, use the deployed database, otherwise use the local mongoHeadlines database
var MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/mongoHeadlines";

//setup handlebars
app.engine("handlebars", xhb({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

//set mongoose to leverage built in JavaScript ES6 Promises
mongoose.Promise = Promise;
//connect to the Mongo DB
mongoose.connect(MONGODB_URI);

app.listen(PORT, function() {
	console.log("App running on port: " + PORT);
});