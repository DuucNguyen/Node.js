const Courses = require("../models/Courses");

class CourseController {
    //[GET] /courses/:slug
    async showDetail(req, res) {
        // console.log(req.body.slug);
        // console.log(req.query.slug);
        // console.log(req.params.slug);

        const course = await Courses.findOne({ slug: req.params.slug }).lean();
        res.render("./courses/showDetail", { course });
    }

    //[GET] /courses/create
    async create(req, res) {
        res.render("./courses/create");
    }

    //[POST] /courses/store
    async store(req, res) {
        try {
            const formData = req.body;
            const newCourse = new Courses(formData);
            await newCourse.save();

            res.redirect("/");
        } catch (error) {
            console.error("Error saving course:", error);
            res.status(500).json({ error: "Error saving course" });
        }
    }

    //[GET] /courses/:id/edit
    async edit(req, res, next) {
        const course = await Courses.findById(req.params.id).lean();
        res.render("./courses/edit", { course });
    }

    //[PUT] /courses/:id
    async updateCourse(req, res, next) {
        // A.findOneAndUpdate(conditions, update, options)  // returns Query
        const id = req.params.id;
        await Courses.updateOne({ _id: req.params.id }, req.body)
            .then(() => res.redirect("/me/stored/courses"))
            .catch(next);
        // await Courses.findOneAndUpdate(id, req.body, options);
    }
}

module.exports = new CourseController();
