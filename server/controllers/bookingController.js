const Booking = require('../models/Booking');

exports.createBooking = async (req, res) => {
  try {
    const { carName, customerName, email, date, timeSlot } = req.body;
    
    const newBooking = new Booking({
      carName,
      customerName,
      email,
      date,
      timeSlot
    });

    const savedBooking = await newBooking.save();
    res.status(201).json(savedBooking);
  } catch (error) {
    res.status(500).json({ message: "Error creating booking", error: error.message });
  }
};