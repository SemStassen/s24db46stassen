var express = require("express");
var router = express.Router();

// Require controller modules.
var api_controller = require("../controllers/api");
var pigeon_controller = require("../controllers/pigeons");
const pigeon = require("../models/pigeon");

/// API ROUTE ///
// GET resources base.
router.get("/", api_controller.api);
/// PIGEON ROUTES ///
// POST request for creating a Pigeon.
router.post("/pigeons", pigeon_controller.pigeon_create_post);
// DELETE request to delete Pigeon.
router.delete("/pigeons/:id", pigeon_controller.pigeon_delete);
// PUT request to update Pigeon.
router.put("/pigeons/:id", pigeon_controller.pigeon_update_put);
// GET request for one Pigeon.
router.get("/pigeons/:id", pigeon_controller.pigeon_detail);
// GET request for list of all Pigeon items.
router.get("/pigeons", pigeon_controller.pigeon_list);

module.exports = router;
