const nodeMailer = require("nodemailer");
const mailConfig = require("../config/mailConfig");
require("dotenv").config();

exports.sendMail = (to, subject, htmlContent) => {
    const transporter = nodeMailer.createTransport({
        service: "gmail",
        host: mailConfig.HOST,
        port: mailConfig.PORT,
        secure: true,
        auth: {
            user: mailConfig.USERNAME, //sender email
            pass: mailConfig.PASSWORD, //sender app password
        },
    });

    const options = {
        from: {
            name: "NodeJS - Online Learning Courses",
            address: mailConfig.FROM_ADDRESS,
        },
        to: to,
        subject: subject,
        html: htmlContent,
    };
    return transporter.sendMail(options);
};
