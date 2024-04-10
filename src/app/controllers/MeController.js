const Courses = require("../models/Courses");
class MeController {
    //[GET] me/stored/courses
    async storedCourses(req, res, next) {
        //promise - each promises cannot pass multiple variables
        //=> use distructuring pattern (multiple promises)
        Promise.all([
            Courses.find().lean(),
            Courses.countDocumentsDeleted(),
            Courses.countDocumentsWithDeleted(),
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
        const id = req.params.id;
        const courses = await Courses.findDeleted().lean();
        res.render("./me/recycle-bin-courses", { courses });
    }
}

module.exports = new MeController();
