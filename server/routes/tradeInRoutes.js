const express = require("express");
const router = express.Router();
const {
  calculateValuation,
  submitTradeIn,
  getMyTradeIns,
} = require("../controllers/tradeInController");
const { protect } = require("../middleware/authMiddleware");

router.post("/calculate", calculateValuation);
router.post("/submit", protect, submitTradeIn);
router.get("/my", protect, getMyTradeIns);

module.exports = router;