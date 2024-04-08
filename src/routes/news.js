const express = require("express");
const router = express.Router();
const newsController = require("../app/controllers/newsController"); //already included

router.use("/:slug", newsController.show);
router.use("/", newsController.index); //defaul url must be last

module.exports = router;
