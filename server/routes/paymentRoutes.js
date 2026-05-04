const express = require("express");
const router  = express.Router();
const {
  initiatePayment,
  paymentSuccess,
  paymentFail,
  paymentCancel,
  getPaymentStatus,
} = require("../controllers/bookingFeeController");
const { protect } = require("../middleware/authMiddleware");

router.post("/initiate", protect, initiatePayment);
router.post("/success", paymentSuccess);
router.post("/fail",    paymentFail);
router.post("/cancel",  paymentCancel);
router.get("/status/:tranId", protect, getPaymentStatus);

module.exports = router;