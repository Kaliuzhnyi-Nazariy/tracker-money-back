const express = require("express");
const cors = require("cors");
require("dotenv").config();
const userRoutes = require("./routes/user.js");
const moneyRoutes = require("./routes/moneyOperations.js");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/users", userRoutes);
app.use("/api/money", moneyRoutes);

app.use((req, res) => {
  res.status(404).json({ message: "Not found" });
});

app.use((err, req, res, next) => {
  const { status = 500, message = "Server error" } = err;
  res.status(status).json({ message });
});

module.exports = app;
