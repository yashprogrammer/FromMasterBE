const express = require("express");
const router = express.Router();
const Exercise = require("../models/Exercise");

// Get exercises for a specific machine
router.get("/:machineId", async (req, res) => {
  try {
    const exercises = await Exercise.find({ machine: req.params.machineId });
    res.json(exercises);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create a new exercise
router.post("/create-exercises/:machineId", async (req, res) => {
  const { machineId } = req.params; // Get machineId from path parameters
  const { name, thumbnailUrl, formCheckVideoUrl, explanationVideoUrl } =
    req.body;

  // Ensure machineId is provided
  if (!machineId) {
    return res.status(400).json({ message: "machineId is required" });
  }

  const exercise = new Exercise({
    name,
    thumbnailUrl,
    formCheckVideoUrl,
    explanationVideoUrl,
    machine: machineId, // Use machineId from the path
  });

  try {
    await exercise.save();
    res.json(exercise);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Edit an existing exercise
router.patch("/edit-exercise/:exerciseId", async (req, res) => {
  const { exerciseId } = req.params;

  try {
    const updateData = { ...req.body };

    const updatedExercise = await Exercise.findByIdAndUpdate(
      exerciseId,
      { $set: updateData },
      { new: true } // Return the updated document
    );

    if (!updatedExercise) {
      return res.status(404).json({ message: "Exercise not found" });
    }

    res.json(updatedExercise);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Delete an existing exercise
router.delete("/delete-exercise/:exerciseId", async (req, res) => {
  const { exerciseId } = req.params;

  try {
    const deletedExercise = await Exercise.findByIdAndDelete(exerciseId);

    if (!deletedExercise) {
      return res.status(404).json({ message: "Exercise not found" });
    }

    res.json({ message: "Exercise deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
