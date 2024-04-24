const Users = require("../models/Users");

class AuthenticationController {
    //[GET] // temp /login
    async login(req, res, next) {
        var username = req.body.username;
        var password = req.body.password;

        const user = await Users.findOne({ username: username, password: password });
        //console.log(user);
        if (!user) {
            req.flash("loginFailed", "Incorect Username or Password !");
            res.redirect("back");
        } else {
            req.session.user = user;
            return res.redirect("/");
        }
    }

    //[Get] /
    async authenticationPage(req, res, next) {
        res.render("./authentication/authentication_main", { showHeader: false });
    }
}

module.exports = new AuthenticationController();
