const Courses = require("../models/Courses");

class SiteController {
    //[GET] /Home
    async home(req, res, next) {
        // res.render("home");
        try {
            // Fetch courses without using lean()
            const courses = await Courses.find();
            
            // Convert each Mongoose document to a plain JavaScript object with virtuals populated
            const coursesWithVirtuals = courses.map((course) => course.toObject());

            // Pass coursesWithVirtuals to your Handlebars template
            res.render("home", { courses: coursesWithVirtuals });
        } catch (err) {
            next(err);
        }
    }
    //[GET] /search
    async search(req, res) {
        res.render("search");
    }
}

module.exports = new SiteController();

