const express = require("express");
const router = express.Router();
const siteController = require("../app/controllers/SiteController"); //already included
// const { index } = require("../app/controllers/newsController");
// const { show } = require("../app/controllers/newsController");

// newsController.index();
router.use("/search", siteController.search);
router.use("/", siteController.home); //defaul url must be last

module.exports = router;
