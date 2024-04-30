const Courses = require("../models/Courses");
const Users = require("../models/Users");

const findUser = (userID) => {
    return Users.findById(userID);
};

const authUser = (req, res, next) => {
    const user = req.session.user;
    if (!user) {
        return res.redirect("/authentication");
    }
    next();
};

//permission look lke ["ADM", "STU", ...]
const authPage = (permission) => {
    return (req, res, next) => {
        const user = req.session.user;
        const role = user.role;
        if (!permission.includes(role)) {
            // return res.status(401).json("U dont have permission !");
            return res.redirect("/");
        }
        next();
    };
};
const authCoursesPage = (permission) => {
    return (req, res, next) => {
        const user = req.session.user;
        const role = user.role;
        if (!permission.includes(role)) {
            res.redirect("/me/stored/my-courses");
        }
        next();
    };
};

module.exports = {
    authUser,
    authPage,
    authCoursesPage,
};
