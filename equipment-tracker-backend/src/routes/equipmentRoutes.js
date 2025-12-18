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

module.exports = router;
