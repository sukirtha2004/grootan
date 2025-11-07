const mongoose = require("mongoose");

const maskedSchema = new mongoose.Schema({
  originalText: String,
  maskedText: String,
  extractedInfo: Object,
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("MaskedData", maskedSchema);
