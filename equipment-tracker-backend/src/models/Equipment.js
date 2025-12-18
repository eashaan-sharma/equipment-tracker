const mongoose = require("mongoose");

const equipmentSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true
    },
    type: {
      type: String,
      enum: ["Machine", "Vessel", "Tank", "Mixer"],
      required: true
    },
    status: {
      type: String,
      enum: ["Active", "Inactive", "Under Maintenance"],
      required: true
    },
    lastCleanedDate: {
      type: Date,
      required: true
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model("Equipment", equipmentSchema);
