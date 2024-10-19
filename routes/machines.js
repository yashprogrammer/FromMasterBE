const express = require("express");
const router = express.Router();
const Machine = require("../models/Machine");

// Get all machines
router.get("/", async (req, res) => {
  try {
    const machines = await Machine.find();
    res.json(machines);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get a specific machine
router.get("/:id", async (req, res) => {
  try {
    const machine = await Machine.findById(req.params.id);
    if (!machine) return res.status(404).json({ message: "Machine not found" });
    res.json(machine);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create a new machine
router.post("/create-machine", async (req, res) => {
  const { name, imageUrl, targetedMuscles } = req.body;
  const machine = new Machine({ name, imageUrl, targetedMuscles });
  try {
    await machine.save();
    res.json(machine);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Edit an existing machine
router.patch("/edit-machine/:machineId", async (req, res) => {
  const { machineId } = req.params;

  try {
    const updatedMachine = await Machine.findByIdAndUpdate(
      machineId,
      { $set: req.body },
      { new: true } // Return the updated document
    );

    if (!updatedMachine) {
      return res.status(404).json({ message: "Machine not found" });
    }

    res.json(updatedMachine);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Delete an existing machine
router.delete("/delete-machine/:machineId", async (req, res) => {
  const { machineId } = req.params;

  try {
    const deletedMachine = await Machine.findByIdAndDelete(machineId);

    if (!deletedMachine) {
      return res.status(404).json({ message: "Machine not found" });
    }

    res.json({ message: "Machine deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
