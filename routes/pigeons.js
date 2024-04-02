var express = require("express");
const pigeons_controller = require("../controllers/pigeons");
var router = express.Router();

/* GET home page. */
router.get("/", pigeons_controller.pigeon_view_all_page);

module.exports = router;
