//sinh ra de define routes
const newsRoute = require("./news");
const siteRoute = require("./sites");
const coursesRoute = require("./courses");
const meRoute = require("./me");
const authenticationRoute = require("./authentication");

function route(app) {
    //Action --> Dispatcher --> function handler
    // Define routes
    //   app.get("/", (req, res) => {
    //     res.render("home"); //render a html code (response) as view
    //   });
    //   app.use("/home", siteRoute);
    //   app.get("/news", (req, res) => {
    //     console.log("value: " + req.query.value); //req.query for param (param in URL)
    //     res.render("news");
    //   });
    app.use("/news", newsRoute);
    app.use("/courses", coursesRoute);
    app.use("/me", meRoute);
    app.use("/authentication", authenticationRoute);

    //   app.get("/search", (req, res) => {
    //     res.render("search");
    //   });
    app.use("/", siteRoute);
}
module.exports = route;
