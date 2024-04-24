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
const bodyParser = require("body-parser");

const session = require("express-session");
const Redis = require("ioredis"); //store session for error in server (end session by its maxAge not by server)
const RedisStore = require("connect-redis").default;
const clientStore = new Redis(); //default connect to localhost

const flash = require("connect-flash"); //handle session variable in redirect() 
//connect db
db.connect();

const app = express();
const port = process.env.PORT || 8080;

app.set("trust proxy", 1); // trust first proxy
app.use(
    session({
        secret: "keyboard cat",
        store: new RedisStore({ client: clientStore }),
        resave: false, //dat lai session cho moi yeu cau (req) dc xay ra trong maxAge
        saveUninitialized: true, //cookie, session dc dat lai theo connect.sId
        cookie: {
            secure: false, //set true to view in application f12 as dev env
            httpOnly: true,
            maxAge: 30 * 60 * 1000,
        },
    }),
);
app.use(flash());
// Custom middleware to set flash messages
app.use((req, res, next) => {
    res.locals.messages = req.flash();
    res.locals.session = req.session;
    next();
});


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

//register partials
handlebars.registerPartial("_searchResult", "{{_searchResult}}");
handlebars.registerPartial("_tableBody", "{{_table_body}}");
handlebars.registerPartial("_message", "{{_message}}");



app.set("view engine", "hbs"); //set view as handlerbars (using handlebars as html or view part)
app.set("views", path.join(__dirname, "resources", "views")); //set path to views folder (find the corresponding view and use it as view)
// console.log(path.join("Path: " + __dirname, "resources/views"));

// //Action --> Dispatcher --> function handler
// // Define routes

app.get("/session/set", (req, res) => {
    req.session.user = {
        username: "ductan0312",
        password: "123456",
        email: "ducnguyen.031203@gmail.com",
    };
    res.send("Set OK !");
});

app.get("/session/get", (req, res) => {
    res.send(req.session.user);
});

route(app);
//-------> routes/index/js

// Listen on port
app.listen(port, () => {
    console.log(`App listening on port:  http://localhost:${port}`);
});
