const Courses = require("../models/Courses");

class SiteController {
    //[GET] /Home
    async home(req, res, next) {
        // res.render("home");
        try {
            const courses = await Courses.find().lean();
            console.log(courses);
            res.render("home", { courses });

            // Courses.find({}) //promises
            //     .then((courses) => res.json(courses))
            //     .catch((error) => next(error));
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
