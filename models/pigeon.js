const mongoose = require("mongoose");

const pigeonSchema = mongoose.Schema({
price: Number,
breed: String,
gender: ["male", "female"]
});

module.exports = mongoose.model("Pigeon", pigeonSchema);
