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

// Get all bookings for a specific email
exports.getUserBookings = async (req, res) => {
  try {
    const { email } = req.params;
    const bookings = await Booking.find({ email }).sort({ createdAt: -1 });
    res.status(200).json(bookings);
  } catch (error) {
    res.status(500).json({ message: "Error fetching bookings", error: error.message });
  }
};

// Delete/Cancel a booking by ID
exports.deleteBooking = async (req, res) => {
  try {
    const { id } = req.params;
    await Booking.findByIdAndDelete(id);
    res.status(200).json({ message: "Booking deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting booking", error: error.message });
  }
};