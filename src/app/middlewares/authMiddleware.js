const Courses = require("../models/Courses");
const Users = require("../models/Users");

const findUser = (userID) => {
    return Users.find((user) => user._id === userID);
};

const authUser = (req, res, next) => {
    const user = req.session.user;
    if (!user) {
        // return res.status(403).json("U need to sign in first !");
        return res.redirect("/authentication");
    }
    req.session.user = user;
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
