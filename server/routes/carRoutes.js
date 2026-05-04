const express = require("express");
const router  = express.Router();
const { downloadCarPDF } = require("../controllers/pdfController");
const { protect }        = require("../middleware/authMiddleware");

router.get("/:carId/pdf", protect, downloadCarPDF);

module.exports = router;