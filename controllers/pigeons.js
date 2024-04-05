var Pigeon = require("../models/pigeon");

// List of all pigeons
exports.pigeon_list = async function (req, res) {
  try {
    const result = await Pigeon.find();
    res.send(result);
  } catch (err) {
    res.status(500);
    res.send(`{"error": ${err}}`);
  }
};

// for a specific pigeon.
exports.pigeon_detail = async function (req, res) {
  console.log("detail" + req.params.id);

  try {
    const result = await Pigeon.findById(req.params.id);
    res.send(result);
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
exports.pigeon_delete = async function (req, res) {
  console.log("delete " + req.params.id);

  try {
    const result = await Pigeon.findByIdAndDelete(req.params.id);
    console.log("Removed " + result);
    res.send(result);
  } catch (err) {
    res.status(500);
    res.send(`{"error": Error deleting ${err}}`);
  }
};

// Handle pigeon update form on PUT.
exports.pigeon_update_put = async function (req, res) {
  console.log(
    `update on id ${req.params.id} with body ${JSON.stringify(req.body)}`
  );

  try {
    let toUpdate = await Pigeon.findById(req.params.id);

    // Do updates of properties
    if (req.body.breed) toUpdate.breed = req.body.breed;
    if (req.body.price) toUpdate.price = req.body.price;
    if (req.body.gender) toUpdate.gender = req.body.gender;

    let result = await toUpdate.save();

    console.log("Sucess " + result);
    res.send(result);
  } catch (err) {
    res.status(500);
    res.send(`{"error": ${err}: Update for id ${req.params.id} failed`);
  }
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

// Handle a show one view with id specified by query
exports.pigeon_view_one_page = async function (req, res) {
  console.log("single view for id " + req.query.id);
  try {
    result = await Pigeon.findById(req.query.id);
    console.log(result);
    res.render("pigeondetail", { title: "Pigeon Detail", toShow: result });
  } catch (err) {
    res.status(500);
    res.send(`{'error': '${err}'}`);
  }
};

// Handle building the view for creating a pigeon.
// No body, no in path parameter, no query.
// Does not need to be async
exports.pigeon_create_page = function (req, res) {
  console.log("create view");
  try {
    res.render("pigeoncreate", { title: "Pigeon Create" });
  } catch (err) {
    res.status(500);
    res.send(`{'error': '${err}'}`);
  }
};

// Handle building the view for updating a costume.
// query provides the id
exports.pigeon_update_page = async function (req, res) {
  console.log("update view for item " + req.query.id);
  try {
    let result = await Pigeon.findById(req.query.id);
    res.render("pigeonupdate", { title: "Pigeon Update", toShow: result });
  } catch (err) {
    res.status(500);
    res.send(`{'error': '${err}'}`);
  }
};

// Handle a delete one view with id from query
exports.pigeon_delete_page = async function (req, res) {
  console.log("Delete view for id " + req.query.id);
  try {
    result = await Pigeon.findById(req.query.id);
    res.render("pigeondelete", { title: "Pigeon Delete", toShow: result });
  } catch (err) {
    res.status(500);
    res.send(`{'error': '${err}'}`);
  }
};
