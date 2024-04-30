const Courses = require("../models/Courses");
const Users = require("../models/Users");

const fs = require("fs");
const path = require("path");
const imageBasePath = "/uploads/courseImages"; //set path to all upload file image
const uploadPath = path.join("src/public", imageBasePath); //config file dynamiccally
class CourseController {
    //[GET] /courses/:slug
    async showDetail(req, res, next) {
        // console.log(req.body.slug);
        // console.log(req.query.slug);
        // console.log(req.params.slug);
        try {
            let course = await Courses.findOne({ slug: req.params.slug });
            course = course.toObject();
            res.render("./courses/showDetail", { course });
        } catch (error) {
            console.log("Show detail error : " + error);
        }
    }

    //[GET] /courses/create
    async create(req, res) {
        res.render("./courses/create");
    }

    //[POST] /courses/store
    async store(req, res) {
        const fileName = req.file != null ? req.file.filename : null;

        const formData = req.body;
        const newCourse = new Courses({
            name: formData.name,
            description: formData.description,
            imagePath: fileName,
            videoID: formData.videoID,
        });
        try {
            await newCourse.save();
            res.redirect("/me/stored/courses");
        } catch (error) {
            if (newCourse.imagePath != null) {
                removeCourseImage(newCourse.imagePath);
            }
            console.error("Error saving course:", error);
            res.status(500).json({ error: "Error saving course" }); // lam lai
        }

        function removeCourseImage(fileName) {
            //handle error save new course
            fs.unlink(path.join(uploadPath, fileName), (err) => {
                if (err) console.error(err);
            });
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

    //[GET /courses/search
    async searchByAJAX(req, res, next) {
        let searchValue = req.body.txt_value;
        try {
            let courses = await Courses.find({ name: { $regex: searchValue, $options: "i" } });
            res.json({ courses: courses });
        } catch (error) {
            console.log(error);
        }
    }
    //[POST] /courses/save
    async saveCourse(req, res, next) {
        try {
            let course_id = req.body.courses_id;
            course_id = parseInt(course_id);
            let user = req.session.user;
            user.courses.push(course_id);
            await Users.updateOne({ _id: user._id }, { courses: user.courses });
            req.session.user = user;
            res.redirect("back");
        } catch (error) {
            console.log("Save course error : " + error);
        }
    }
}

module.exports = new CourseController();
