require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();
const mongoose = require("mongoose");
const userRoutes = require("./routes/userRoutes");
const notesRoutes = require("./routes/notesRoutes");

const PORT = 3000;
const mongoURL = process.env.MONGO_DB_URI;

app.use(express.json());
app.use(
  cors({
    origin: "*",
  })
);

mongoose
  .connect(mongoURL)
  .then(() => {
    console.log("Successfully connected to DB");
  })
  .catch((err) => {
    console.error("DB connection failed:", err);
  });

app.use("/api/v1/", userRoutes);
app.use("/api/v1/", notesRoutes);

app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});

module.exports = app;
