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
}

module.exports = new MeController();
