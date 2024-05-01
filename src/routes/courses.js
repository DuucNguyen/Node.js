const express = require("express");
const router = express.Router();
const courseController = require("../app/controllers/CourseController"); //already included
const path = require("path");
const imageBasePath = "/uploads/courseImages"; //set path to all upload file image
const uploadPath = path.join("src/public", imageBasePath); //config file dynamiccally
const multer = require("multer");
const { model } = require("mongoose");
const imageMimeTypes = ["image/jpeg", "image/png", "image/gif"]; //config acceptable file type as image
const upload = multer({
    //config multer (upload form with file)
    dest: uploadPath,
    fileFilter: (req, file, callback) => {
        callback(null, imageMimeTypes.includes(file.mimetype));
    },
    limits: {
        fileSize: 10 * 1024 * 1024, // 10MB file size limit
    },
});

const authMiddleware = require("../app/middlewares/authMiddleware");
const navigatorMiddleware = require("../app/middlewares/navigatorMiddleware");

router.get(
    "/create",
    authMiddleware.authUser,
    authMiddleware.authPage(["ADM", "MOD"]),
    courseController.create,
);
router.get("/learning/:slug", courseController.learningPage);
router.post("/search", courseController.searchByAJAX);
router.post("/store", upload.single("imageFile"), courseController.store);
router.post("/handle-form-action", courseController.handleFormAction);
router.get("/:id/edit", courseController.edit);
router.patch("/:id/restore", courseController.restoreCourse);
router.put("/:id", courseController.updateCourse);
router.delete("/:id", courseController.deleteCourse);
router.delete("/:id/force", courseController.deletePermanentCourse);
router.post("/save", authMiddleware.authUser, courseController.saveCourse);
router.post("/remove-bookmark", courseController.removeBookmark);
router.get("/:slug", navigatorMiddleware.courseNav(), courseController.showDetail);

module.exports = router; //-> Controller -> index
