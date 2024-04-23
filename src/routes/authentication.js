const express = require("express");
const router = express.Router();

const authenticationController = require("../app/controllers/AuthenticationController");

router.post("/login", authenticationController.login);
router.get("/", authenticationController.authenticationPage);

module.exports = router;
