const Courses = require("../models/Courses");

class SiteController {
    //[GET] /Home
    async home(req, res, next) {
        // res.render("home");
        try {
            const courses = await Courses.find()
                .lean()
                .then(() => {
                    res.render("home", { courses });
                })
                .catch(next);
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

