const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const StudentSchema = new Schema({
  name: String,
  rollNumber: String,
  mobileNumber: String,
  classid: { type: mongoose.Schema.Types.ObjectId, ref: "Class" },
});

module.exports = mongoose.model("Student", StudentSchema);
