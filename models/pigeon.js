const mongoose = require("mongoose");

const pigeonSchema = mongoose.Schema({
  price: {
    type: Number,
    min: [0, "Price can't be negative"],
    max: [999999, "Price can't be more than a million"],
  },
  breed: String,
  gender: ["male", "female"],
});

module.exports = mongoose.model("Pigeon", pigeonSchema);
