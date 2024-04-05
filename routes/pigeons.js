var express = require("express");
const pigeon_controller = require("../controllers/pigeons");
var router = express.Router();

// A little function to check if we have an authorized user and continue on or redirect to login.
const secured = (req, res, next) => {
  if (req.user) {
    return next();
  }
  res.redirect("/login");
};

/* GET home page. */
router.get("/", pigeon_controller.pigeon_view_all_page);

// New endpoints
// GET detail pigeon page
router.get("/detail", pigeon_controller.pigeon_view_one_page);
// GET create costume page
router.get("/create", pigeon_controller.pigeon_create_page);
// GET create update page
router.get("/update", secured, pigeon_controller.pigeon_update_page);
// GET delete costume page
router.get("/delete", pigeon_controller.pigeon_delete_page);

module.exports = router;
