const TradeIn = require("../models/TradeIn");

const BASE_VALUE = 1500000;

const CONDITION_MULTIPLIERS = {
  excellent: 1.0,
  good: 0.85,
  fair: 0.65,
  poor: 0.45,
};

function calculateTradeIn(year, mileage, condition) {
  const currentYear = new Date().getFullYear();
  const age = currentYear - year;

  const ageDeductionRate = Math.min(age * 0.08, 0.70);
  const baseValue = BASE_VALUE;
  const ageDeduction = Math.round(baseValue * ageDeductionRate);

  const expectedKm = age * 15000;
  const excessKm = Math.max(0, mileage - expectedKm);
  const mileageDeduction = Math.round(excessKm * 0.5);

  const valueAfterDeductions = Math.max(0, baseValue - ageDeduction - mileageDeduction);
  const conditionMultiplier = CONDITION_MULTIPLIERS[condition];
  const estimatedValue = Math.round(valueAfterDeductions * conditionMultiplier);

  return {
    estimatedValue,
    breakdown: {
      baseValue,
      ageDeduction,
      mileageDeduction,
      conditionMultiplier,
    },
  };
}

exports.calculateValuation = async (req, res) => {
  try {
    const { make, model, year, mileage, condition } = req.body;

    if (!make || !model || !year || mileage === undefined || !condition) {
      return res.status(400).json({ message: "All fields are required." });
    }

    const result = calculateTradeIn(year, mileage, condition);

    return res.status(200).json({
      success: true,
      make,
      model,
      year,
      mileage,
      condition,
      ...result,
    });
  } catch (err) {
    return res.status(500).json({ message: "Server error.", error: err.message });
  }
};

exports.submitTradeIn = async (req, res) => {
  try {
    const { make, model, year, mileage, condition } = req.body;
    const customerId = req.user.id;

    const { estimatedValue, breakdown } = calculateTradeIn(year, mileage, condition);

    const tradeIn = new TradeIn({
      customerId,
      make,
      model,
      year,
      mileage,
      condition,
      estimatedValue,
      breakdown,
    });

    await tradeIn.save();

    return res.status(201).json({
      success: true,
      message: "Trade-in request submitted.",
      tradeIn,
    });
  } catch (err) {
    return res.status(500).json({ message: "Server error.", error: err.message });
  }
};

exports.getMyTradeIns = async (req, res) => {
  try {
    const tradeIns = await TradeIn.find({ customerId: req.user.id }).sort({ createdAt: -1 });
    return res.status(200).json({ success: true, tradeIns });
  } catch (err) {
    return res.status(500).json({ message: "Server error.", error: err.message });
  }
};