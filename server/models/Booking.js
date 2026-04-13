const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  carName: { type: String, required: true },
  customerName: { type: String, required: true },
  email: { type: String, required: true },
  date: { type: Date, required: true },
  timeSlot: { type: String, required: true }, // e.g., "10:00 AM - 11:00 AM"
  status: { 
    type: String, 
    enum: ['Pending', 'Confirmed', 'Cancelled'], 
    default: 'Pending' 
  }
}, { timestamps: true });

module.exports = mongoose.model('Booking', bookingSchema);