const mongoose = require("mongoose");

const ClassSchema = new mongoose.Schema({
  standard: String,
  division: String,
});

module.exports = mongoose.model("Class", ClassSchema);
