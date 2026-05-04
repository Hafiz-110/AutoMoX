const mongoose = require("mongoose");

const bookingFeeSchema = new mongoose.Schema(
  {
    customerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    carId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Car",
      required: true,
    },
    amount: {
      type: Number,
      required: true,
      default: 10000,
    },
    transactionId: {
      type: String,
      unique: true,
      required: true,
    },
    sslSessionKey: {
      type: String,
    },
    status: {
      type: String,
      enum: ["pending", "paid", "failed", "cancelled"],
      default: "pending",
    },
    sslResponse: {
      type: mongoose.Schema.Types.Mixed,
    },
    reservedUntil: {
      type: Date,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("BookingFee", bookingFeeSchema);