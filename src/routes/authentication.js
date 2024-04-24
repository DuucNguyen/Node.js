const express = require("express");
const router = express.Router();

const authenticationController = require("../app/controllers/AuthenticationController");

router.post("/login", authenticationController.login);
router.post("/sendVerification", authenticationController.sendMail);
router.post("/verifyEmail", authenticationController.verifyEmail);
router.post("/registerPassword", authenticationController.registerPassword);

router.get("/registerPage", authenticationController.registerPage);
router.get("/", authenticationController.loginPage);

module.exports = router;
