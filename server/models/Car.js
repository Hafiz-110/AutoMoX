const mongoose = require('mongoose');

const carSchema = new mongoose.Schema({
    make: { type: String, required: true },
    model: { type: String, required: true },
    fuelType: { type: String, required: true },
    price: { type: Number, required: true },
    year: { type: Number, required: true },
    images: [{ type: String }],
    vin: { type: String, required: true, unique: true },
    stockStatus: { type: String, enum: ['available', 'reserved', 'sold', 'archived'], default: 'available' },
    viewCount: { type: Number, default: 0 },
    // Fields for VIN auto-populate (Feature 15)
    engineType: { type: String },
    transmission: { type: String },
    bodyStyle: { type: String },
    drivetrain: { type: String },
    color: { type: String },
    msrp: { type: Number },
});

module.exports = mongoose.model('Car', carSchema);
