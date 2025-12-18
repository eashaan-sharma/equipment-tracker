const express = require("express");
const router = express.Router();
const Equipment = require("../models/Equipment");

router.get("/", async (req, res) => {
  try {
    const equipment = await Equipment.find().sort({ createdAt: -1 });
    res.json(equipment);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch equipment" });
  }
});

router.post("/", async (req, res) => {
  try {
    const { name, type, status, lastCleanedDate } = req.body;

    // Basic validation
    if (!name || !type || !status || !lastCleanedDate) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const equipment = new Equipment({
        name,
        type,
        status,
        lastCleanedDate
    });


    const savedEquipment = await equipment.save();
    res.status(201).json(savedEquipment);
  } catch (error) {
    res.status(500).json({ message: "Failed to add equipment" });
  }
});

// PUT /api/equipment/:id
router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { name, type, status, lastCleanedDate } = req.body;

    if (!name || !type || !status || !lastCleanedDate) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const updatedEquipment = await Equipment.findByIdAndUpdate(
      id,
      { name, type, status, lastCleanedDate },
      { new: true, runValidators: true }
    );

    if (!updatedEquipment) {
      return res.status(404).json({ message: "Equipment not found" });
    }

    res.json(updatedEquipment);
  } catch (error) {
    res.status(500).json({ message: "Failed to update equipment" });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const deletedEquipment = await Equipment.findByIdAndDelete(id);

    if (!deletedEquipment) {
      return res.status(404).json({ message: "Equipment not found" });
    }

    res.json({ message: "Equipment deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete equipment" });
  }
});


module.exports = router;
