const Courses = require("../models/Courses");

class CourseController {
    //[GET] /course/:slug
    async showDetail(req, res) {
        // console.log(req.body.slug);
        // console.log(req.query.slug);
        // console.log(req.params.slug);

        const course = await Courses.findOne({ slug: req.params.slug })
            .lean()
            .exec();
        res.render("./courses/showDetail", { course });
    }
}

module.exports = new CourseController();
