const mongoose = require("mongoose");

const machineSchema = new mongoose.Schema({
  name: { type: String, required: true },
  imageUrl: { type: String, required: true },
  targetedMuscles: { type: String, required: true }, // Can also be an image URL
});

module.exports = mongoose.model("Machine", machineSchema);
