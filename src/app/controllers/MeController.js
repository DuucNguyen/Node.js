const Courses = require("../models/Courses");
class MeController {
    //[GET] me/stored/courses
    async storedCourses(req, res, next) {
        const courses = await Courses.find().lean();
        res.render("./me/stored-courses", { courses });
    }
    //[GET] me/stored/news
    async storedNews(req, res, next) {
        res.render("stored News");
    }

    //[GET] me/bin/courses
    async deletedCourses(req, res, next) {
        const id = req.params.id;
        const courses = await Courses.findDeleted().lean();
        res.render("./me/recycle-bin-courses", { courses });
    }
}

module.exports = new MeController();
