const mongoose = require("mongoose");

const pigeonSchema = mongoose.Schema({
  price: {
    type: Number,
    min: [0, "Price can't be negative"],
    max: [999999, "Price can't be more than a million"],
  },
  breed: {
    type: String,
    required: [true, "We need to know the breed!"],
  },
  gender: {
    type: String,
    enum: ["male", "female"],
    required: [true, "We need to know the gender!"],
  },
});

module.exports = mongoose.model("Pigeon", pigeonSchema);
