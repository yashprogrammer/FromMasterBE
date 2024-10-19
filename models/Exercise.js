const mongoose = require("mongoose");

const exerciseSchema = new mongoose.Schema({
  name: { type: String, required: true },
  thumbnailUrl: { type: String, required: true },
  formCheckVideoUrl: { type: String, required: true },
  explanationVideoUrl: { type: String, required: true },
  machine: { type: mongoose.Schema.Types.ObjectId, ref: "Machine" },
});

module.exports = mongoose.model("Exercise", exerciseSchema);
