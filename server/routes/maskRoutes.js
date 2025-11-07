const express = require("express");
const router = express.Router();
const { maskData, getMaskedData } = require("../controllers/maskController");

// POST route (mask text)
router.post("/mask", maskData);

// GET route (retrieve logs)
router.get("/mask", getMaskedData);

module.exports = router;
