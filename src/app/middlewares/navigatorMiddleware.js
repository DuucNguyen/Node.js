const Courses = require("../models/Courses");
const Users = require("../models/Users");

const courseNav = () => {
    return async (req, res, next) => {
        let user = req.session.user;
        if (!user) {
            return next();
        } else {
            const courseSlug = req.params.slug;
            let userCourses = user.courses;

            let course = await Courses.findOne({ slug: courseSlug }); //mongoose methods are asynchronous 

            if (userCourses.includes(course._id)) {
                res.redirect("/courses/learning/" + courseSlug);
            }
        }
        next();
    };
};

module.exports = {
    courseNav,
};
