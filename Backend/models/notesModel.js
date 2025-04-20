const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  title: { type: String },
  date: { default: new Date().getTime() },
  content: { type: String },
  tags: { type: [String] },
});

module.exports = mongoose.model("notes", userSchema);
