const Users = require("../models/Users");

class AuthenticationController {
    //[GET] // temp /login
    async login(req, res, next) {
        var username = req.body.username;
        var password = req.body.password;

        const user = await Users.findOne({ username: username, password: password });
        //console.log(user);
        if (!user) {
            // res.render("./authentication/login", {
            //     showHeader: false,
            //     msg: "Username or Password incorrect !",
            // });
            req.flash("loginFailed", "Username or Password incorrect!");
            res.locals.message = req.flash();
            res.redirect("back");
        } else {
            res.redirect("/");
        }
    }

    //[Get] /
    async authenticationPage(req, res, next) {
        res.render("./authentication/login", { showHeader: false });
    }
}

module.exports = new AuthenticationController();
