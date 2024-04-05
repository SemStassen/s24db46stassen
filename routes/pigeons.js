var express = require("express");
const pigeon_controller = require("../controllers/pigeons");
var router = express.Router();

/* GET home page. */
router.get("/", pigeon_controller.pigeon_view_all_page);

// New endpoints
// GET detail pigeon page
router.get("/detail", pigeon_controller.pigeon_view_one_page);
// GET create costume page
router.get("/create", pigeon_controller.pigeon_create_page);
// GET create update page
router.get("/update", pigeon_controller.pigeon_update_page);
// GET delete costume page
router.get("/delete", pigeon_controller.pigeon_delete_page);

module.exports = router;
