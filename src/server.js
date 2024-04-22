//setup environtment file (re-use, deploy)
if (process.env.NODE_ENV !== "production") {
    require("dotenv").config();
}
// console.log(require("dotenv").config()); // Check if there are any errors or confirm that dotenv is loaded successfully.

const express = require("express");
const morgan = require("morgan");
const { engine } = require("express-handlebars");
const handlebars = require("handlebars");
const dateFormat = require("handlebars-dateformat");
const path = require("path");
const methodOverride = require("method-override");

const SortMiddleware = require("./app/middlewares/sortMiddleware");
const route = require("./routes");
const db = require("./config/db");
const bodyParser = require('body-parser');

//connect db
db.connect();

const app = express();
const port = process.env.PORT || 8080;
app.use(express.static(path.join(__dirname, "public"))); //set path to use folder public
app.use(bodyParser.json());
app.use(
    express.urlencoded({
        extended: true, //express indluded body-parser so indlude this line
    }),
); //handler data get from form submit (work as middleware)

app.use(express.json()); //handler data get from js or (XMLHttpRequest, fetch, axios, ajax, ...)
app.use(methodOverride("_method"));

app.use(SortMiddleware);

// HTTP logger log the path/port the app is listening
// app.use(morgan("combined"));

// Template engine setup
app.engine(
    ".hbs",
    engine({
        extname: ".hbs",
        helpers: require("./helpers/handlebars"),
    }),
); //set shorthand for handlers file for app to recognize
handlebars.registerHelper("dateFormat", dateFormat); //register date format helper
handlebars.registerPartial("_searchResult", "{{_searchResult}}");
app.set("view engine", "hbs"); //set view as handlerbars (using handlebars as html or view part)
app.set("views", path.join(__dirname, "resources", "views")); //set path to views folder (find the corresponding view and use it as view)
// console.log(path.join("Path: " + __dirname, "resources/views"));

// //Action --> Dispatcher --> function handler
// // Define routes
// app.get("/", (req, res) => {
//   res.render("home"); //render a html code (response) as view
// });

// app.get("/news", (req, res) => {
//   console.log("value: " + req.query.value); //req.query for param (param in URL)
//   res.render("news");
// });

// app.get("/search", (req, res) => {
//   res.render("search");
// });
// app.post("/search", (req, res) => {
//   console.log(req.body.value); //req.body for form data (form)
//   res.render("search");
// });
route(app);
//-------> routes/index/js

// Listen on port
app.listen(port, () => {
    console.log(`App listening on port:  http://localhost:${port}`);
});
