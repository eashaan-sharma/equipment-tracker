const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const equipmentRoutes = require("./routes/equipmentRoutes");

require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.error("MongoDB connection error:", err));

app.get("/", (req, res) => {
  res.send("Equipment Tracker API running");
});

const PORT = process.env.PORT || 5000;
app.use("/api/equipment", equipmentRoutes);
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

