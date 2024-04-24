const Users = require("../models/Users");
const mailer = require("../../utils/mailer");
const randomstring = require("randomstring");
const NodeCache = require("node-cache");
const cache = new NodeCache();

//config cache otp
const length = 10; //length otp
const expirationTime = 30000; //expiration time

class AuthenticationController {
    //[GET] // temp /login
    async login(req, res, next) {
        var username = req.body.username;
        var password = req.body.password;

        const user = await Users.findOne({ username: username, password: password });
        //console.log(user);
        if (!user) {
            req.flash("msg", "Incorect Username or Password !");
            res.redirect("back");
        } else {
            req.session.user = user;
            return res.redirect("/");
        }
    }

    //[POST] /auth/sendVerification
    async sendMail(req, res, next) {
        var username = req.body.username;
        var email = req.body.email;
        const otp = generateRandomString(length, expirationTime);
        mailer.sendMail(
            email,
            "Verify Email",
            '<form action="' +
                process.env.APP_URL +
                '/authentication/verifyEmail" method="POST"> <input type="hidden" name="username" value="' +
                username +
                '"/> <input type="hidden" name="email" value="' +
                email +
                '"/> <input type="hidden" name="otp", value="' +
                otp +
                '" /> <input type="submit" value="verify"/>  <form>',
        );
        req.flash("msg", "Verification mail send. Pls check your email !");
        res.redirect("back");
    }

    //[POST] /auth/verifyEmail
    async verifyEmail(req, res, next) {
        var isValid = verify(req.body.otp);
        if (isValid) {
            res.send("Verified - Set Password");
        } else {
            req.flash("msg", "Verification expired or internal server error ! Try again");
            res.redirect("/authentication/registerPage");
        }
    }

    //[GET] /authentication/registerPage
    async registerPage(req, res, next) {
        res.render("./authentication/register", { showHeader: false });
    }

    //[Get] /authentication
    async loginPage(req, res, next) {
        res.render("./authentication/login", { showHeader: false });
    }
}
function generateRandomString(length, exprirationTime) {
    const string = randomstring.generate(length);
    cache.set(string, true, exprirationTime / 1000); //convert miliseconds to seconds
    return string;
}
function verify(string) {
    return cache.has(string);
}

module.exports = new AuthenticationController();
