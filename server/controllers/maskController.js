const MaskedData = require("../models/MaskedData");
const { processPII } = require("../utils/maskFunctions");

// POST - mask text and store
exports.maskData = async (req, res) => {
  const { text } = req.body;

  const processed = processPII(text);

  // Save masked data to MongoDB
  await MaskedData.create({
    originalText: text,
    maskedText: processed.maskedText,
    extractedInfo: processed,
  });

  res.json(processed);
};



// GET - fetch masked data from MongoDB
exports.getMaskedData = async (req, res) => {
  try {
    const data = await MaskedData.find().sort({ createdAt: -1 });
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch masked data" });
  }
};
