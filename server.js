//npm imports
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
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));

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
mongoose.connect(MONGODB_URI, {useNewUrlParser: true});

function scrape() {
	request("https://www.polygon.com", function(err, response, body) {
		var $ = cheerio.load(body);
		$("div.c-entry-box--compact").each(function(i, element) {
			var newArticle = {};

			newArticle.title = $(this)
				.children("div.c-entry-box--compact__body")
				.children("h2")
				.children("a")
				.text();
			newArticle.link = $(this)
				.children("div.c-entry-box--compact__body")
				.children("h2")
				.children("a")
				.attr("href");
			newArticle.image = $(this)
				.children("a.c-entry-box--compact__image-wrapper")
				.children("picture")
				.children("img")
				.attr("src");
			newArticle.byline = $(this)
				.children("div.c-entry-box--compact__body")
				.children("div.c-byline")
				.children("span.c-byline__item")
				.children("a")
				.text();
		})
	});
}

app.get("/", function(req, res) {
	scrape();
});

app.listen(PORT, function() {
	console.log("App running on port: " + PORT);
});