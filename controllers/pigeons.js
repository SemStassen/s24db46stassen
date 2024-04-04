var Pigeon = require("../models/pigeon");

// List of all pigeons
exports.pigeon_list = async function (req, res) {
  try {
    const foundPigeons = await Pigeon.find();
    res.send(foundPigeons);
  } catch (err) {
    res.status(500);
    res.send(`{"error": ${err}}`);
  }
};

// for a specific pigeon.
exports.pigeon_detail = async function (req, res) {
  console.log("detail" + req.params.id);
  try {
    const pigeon = await Pigeon.findById(req.params.id);
    res.send(pigeon);
  } catch (error) {
    res.status(500);
    res.send(`{"error": document for id ${req.params.id} not found`);
  }
};

// Handle pigeon create on POST.
exports.pigeon_create_post = async function (req, res) {
  console.log(req.body);

  let document = new Pigeon();
  document.breed = req.body.breed;
  document.gender = req.body.gender;
  document.price = req.body.price;
  try {
    let result = await document.save();
    res.send(result);
  } catch (err) {
    res.status(500);
    res.send(`{"error": ${err}}`);
  }
};

// Handle pigeon delete from on DELETE.
exports.pigeon_delete = function (req, res) {
  res.send("NOT IMPLEMENTED: pigeon delete DELETE " + req.params.id);
};
// Handle pigeon update form on PUT.
exports.pigeon_update_put = function (req, res) {
  res.send("NOT IMPLEMENTED: pigeon update PUT" + req.params.id);
};

// VIEWS
// Handle a show all view
exports.pigeon_view_all_page = async function (req, res) {
  try {
    foundPigeons = await Pigeon.find();
    res.render("pigeons", {
      title: "Pigeon Search Results",
      results: foundPigeons,
    });
  } catch (err) {
    res.status(500);
    res.send(`{"error": ${err}}`);
  }
};
