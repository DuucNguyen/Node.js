const express = require("express");
const route = express.Router();
const meController = require("../app/controllers/MeController");

route.get("/stored/courses", meController.storedCourses);
route.get("/stored/news", meController.storedNews);

module.exports = route;
