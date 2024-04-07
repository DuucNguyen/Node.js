const express = require("express");
const morgan = require("morgan");
const { engine } = require("express-handlebars");
const path = require("path");

const app = express();
const port = 8081;

app.use(express.static(path.join(__dirname, "public")));

// HTTP logger
app.use(morgan("combined"));

// Template engine setup
app.engine(".hbs", engine({ extname: ".hbs" }));
app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "resources/views"));

// console.log(path.join("Path: " + __dirname, "resources/views"));

// Define routes
app.get("/", (req, res) => {
  res.render("home");
});

app.get("/news", (req, res) => {
  res.render("news");
});

// Listen on port
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
