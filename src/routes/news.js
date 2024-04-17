const express = require("express");
const router = express.Router();
const newsController = require("../app/controllers/NewsController"); //already included

router.get("/:slug", newsController.show);
router.get("/", newsController.index); //defaul url must be last

module.exports = router;
