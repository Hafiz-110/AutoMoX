const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true },
    otp: String,
    otpExpires: Date,
    role: { type: String, default: 'Customer' } // Required for Feature 19 (Admin)
});

module.exports = mongoose.model('User', userSchema);