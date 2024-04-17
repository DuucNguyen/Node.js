const Courses = require("../models/Courses");

class CourseController {
    //[GET] /courses/:slug
    async showDetail(req, res, next) {
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

            res.redirect("/me/stored/courses");
        } catch (error) {
            console.error("Error saving course:", error);
            res.status(500).json({ error: "Error saving course" });
        }
    }

    //[GET] /courses/:id/edit
    async edit(req, res, next) {
        const course = await Courses.findById(req.params.id)
            .lean()
            .then(() => {
                res.render("./courses/edit", { course });
            })
            .catch(next);
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

    //[DELETE] /courses/:id
    async deleteCourse(req, res, next) {
        await Courses.delete({ _id: req.params.id }) // "delete plugin" (soft delete)
            .then(() => res.redirect("back"))
            .catch(next);
    }
    //[DELETE] /courses/:id/force
    async deletePermanentCourse(req, res, next) {
        await Courses.deleteOne({ _id: req.params.id }) //delete mongoose (force delete)
            .then(() => res.redirect("back"))
            .catch(next);
    }

    //[PATCH] /courses/:id/restore
    async restoreCourse(req, res, next) {
        // const id = req.params.id;
        // await Courses.restore({ _id: id }) //restore doest not change deleted: false but remove deleted
        //     .catch(next);
        //     .then(() => res.redirect("back"))
        const id = req.params.id;
        await Courses.findOneAndUpdateDeleted({ _id: id }, { deleted: false })
            .lean()
            .then(() => res.redirect("back"))
            .catch(next);
    }
    //[POST] /courses/handle-form-action
    async handleFormAction(req, res, next) {
        const action = req.body.action;
        if (action === "delete") {
            await Courses.delete({ _id: { $in: req.body.courseIds } }) //delete plugin (soft delete)
                .then(() => res.redirect("back"))
                .catch(next);
        } else if (action === "restore") {
            await Courses.updateManyDeleted(
                { _id: { $in: req.body.courseIds } },
                { deleted: false },
            )
                .then(() => res.redirect("back"))
                .catch(next);
        } else if (action === "delete_force") {
            await Courses.deleteMany({ _id: { $in: req.body.courseIds } }) //delete plugin (soft delete)
                .then(() => res.redirect("back"))
                .catch(next);
        }
    }
}

module.exports = new CourseController();
