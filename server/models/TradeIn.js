const mongoose = require("mongoose");

const tradeInSchema = new mongoose.Schema(
  {
    customerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    make: { type: String, required: true, trim: true },
    model: { type: String, required: true, trim: true },
    year: {
      type: Number,
      required: true,
      min: 1990,
      max: new Date().getFullYear(),
    },
    mileage: { type: Number, required: true, min: 0 },
    condition: {
      type: String,
      enum: ["excellent", "good", "fair", "poor"],
      required: true,
    },
    estimatedValue: { type: Number, required: true },
    breakdown: {
      baseValue: Number,
      ageDeduction: Number,
      mileageDeduction: Number,
      conditionMultiplier: Number,
    },
    status: {
      type: String,
      enum: ["pending", "reviewed", "accepted", "rejected"],
      default: "pending",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("TradeIn", tradeInSchema);