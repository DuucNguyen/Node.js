const express = require("express");
const router = express.Router();
const courseController = require("../app/controllers/CourseController"); //already included

router.get("/create", courseController.create);
router.post("/store", courseController.store);
router.get("/:id/edit", courseController.edit);
router.put("/:id", courseController.updateCourse);
router.delete("/:id", courseController.deleteCourse);
router.get("/:slug", courseController.showDetail);

module.exports = router; //-> Controller -> index
