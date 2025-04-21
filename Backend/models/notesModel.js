const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const notesSchema = new Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "User" },
  title: { type: String },
  date: { type: Date, default: Date.now },
  content: { type: String },
  tags: { type: [String], default: [] },
  isPinned: { type: Boolean, default: false },
});

module.exports = mongoose.model("Notes", notesSchema);
