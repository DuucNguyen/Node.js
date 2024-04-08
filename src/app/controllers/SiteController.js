const Courses = require("../models/Courses");

class SiteController {
    //[GET] /Home
    async home(req, res) {
        // res.render("home");
        try {
            const courses = await Courses.find();
            console.log(courses);
            res.json(courses);
        } catch (err) {
            console.error(err);
            res.status(400).json({ error: "Error" });
        }
    }
    //[GET] /search
    async search(req, res) {
        res.render("search");
    }
}

module.exports = new SiteController();
