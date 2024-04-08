const express = require("express");
const router = express.Router();
const courseController = require("../app/controllers/CourseController"); //already included

router.get("/:slug", courseController.showDetail);

module.exports = router; //-> Controller -> index
