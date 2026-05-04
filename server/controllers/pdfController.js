const Car = require("../models/Car");
const generateCarPDF = require("../utils/generateCarPDF");

exports.downloadCarPDF = async (req, res) => {
  try {
    const car = await Car.findById(req.params.carId);
    if (!car) return res.status(404).json({ message: "Car not found." });

    const carPrice       = car.price;
    const downPayment    = Number(req.query.downPayment)    || carPrice * 0.2;
    const interestRate   = Number(req.query.interestRate)   || 10;
    const loanTermMonths = Number(req.query.loanTermMonths) || 36;

    const loanAmount  = carPrice - downPayment;
    const monthlyRate = interestRate / 100 / 12;

    const monthlyPayment =
      loanAmount *
      (monthlyRate * Math.pow(1 + monthlyRate, loanTermMonths)) /
      (Math.pow(1 + monthlyRate, loanTermMonths) - 1);

    const totalPayable  = monthlyPayment * loanTermMonths + downPayment;
    const totalInterest = totalPayable - carPrice;

    const finance = {
      carPrice,
      downPayment,
      interestRate,
      loanTermMonths,
      monthlyPayment: Math.round(monthlyPayment),
      totalPayable:   Math.round(totalPayable),
      totalInterest:  Math.round(totalInterest),
    };

    generateCarPDF(car, finance, res);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "PDF generation failed.", error: err.message });
  }
};