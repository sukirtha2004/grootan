const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const maskRoutes = require("./routes/maskRoutes");

const app = express();
app.use(express.json());
app.use(cors());


mongoose
  .connect("mongodb://localhost:27017/personalInfoMasker", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Routes
app.use("/api", maskRoutes);

app.listen(5000, () => console.log("Server running on port 5000"));
