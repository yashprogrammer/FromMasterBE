const express = require("express");
const app = express();
const PORT = process.env.PORT || 5000;
const machineRoutes = require("./routes/machines");
const exerciseRoutes = require("./routes/exercises");
const connectDB = require("./config");
const cors = require("cors");
require("dotenv").config();

// Connect to MongoDB
connectDB();

// Middleware to handle JSON
app.use(express.json());
app.use(cors());

app.use("/api/machines", machineRoutes);
app.use("/api/exercises", exerciseRoutes);

// Test route
app.get("/", (req, res) => {
  res.send("Server is running");
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
