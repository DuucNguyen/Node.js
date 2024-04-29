const { default: mongoose } = require("mongoose");
const Courses = require("../models/Courses");
const Users = require("../models/Users");
class MeController {
    //[GET] me/stored/courses
    async storedCourses(req, res, next) {
        //promise - each promises cannot pass multiple variables
        //=> use distructuring pattern (multiple promises)
        let coursesQuery = await Courses.find().sortable(req); //using sortable helper in order to re-use method sort
        let coursesQueryWithVirtual = coursesQuery.map((course) => course.toObject());
        Promise.all([
            coursesQueryWithVirtual,
            Courses.countDocumentsDeleted(),
            Courses.countDocuments(),
        ]) //receive multiple promises
            .then(
                (
                    [courses, countDeleted, countCourses], //receive array of return values of corresponding promise
                ) =>
                    res.render("./me/stored-courses", {
                        countCourses,
                        countDeleted,
                        courses,
                    }),
            )
            .catch(next);
        // await Courses.countDocumentsDeleted().then((countDeleted) =>
        //     console.log(countDeleted),
        // );
        // await Courses.find()
        //     .lean()
        //     .then((courses) => res.render("./me/stored-courses", { courses }))
        //     .catch(next);
    }
    //[GET] me/stored/news
    async storedNews(req, res, next) {
        res.render("stored News");
    }

    //[GET] me/bin/courses
    async deletedCourses(req, res, next) {
        let coursesDeletedQuery = await Courses.findDeleted().sortable(req); //mongoose doest not return array imadiately so await ot use map
        let coursesQueryWithVirtual = coursesDeletedQuery.map((course) => course.toObject());

        Promise.all([
            coursesQueryWithVirtual,
            Courses.countDocumentsDeleted(),
            Courses.countDocuments(),
        ]) //receive multiple promises
            .then(
                (
                    [courses, countDeleted, countCourses], //receive array of return values of corresponding promise
                ) =>
                    res.render("./me/recycle-bin-courses", {
                        countCourses,
                        countDeleted,
                        courses,
                    }),
            )
            .catch(next);
    }

    //[GET] me/stored/courses/sort
    async sortStoredCoursesByAJAX(req, res, next) {
        try {
            let coursesQuery = await Courses.find().sortable(req); //using sortable helper in order to re-use method sort
            let coursesQueryWithVirtual = coursesQuery.map((course) => course.toObject());
            res.json({ courses: coursesQuery });
        } catch (error) {
            console.log("/me/stored/sort - ERROR : " + error);
        }
    }

    //[GET] /stored/my-courses
    async myCoursesPage(req, res, next) {
        try {
            const user = req.session.user;
            let courses = await Courses.find({ _id: { $in: user.courses } });
            courses = courses.map((course) => course.toObject());
            
            res.render("./me/my-courses", { courses });
        } catch (error) {
            console.log("MeController-my-courses error: " + error);
        }
    }
}

module.exports = new MeController();
