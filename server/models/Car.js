const mongoose = require('mongoose');

const carSchema = new mongoose.Schema({
<<<<<<< HEAD
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
=======
  make:      { type: String, required: true },
  model:     { type: String, required: true },
  fuelType:  { type: String, required: true },
  price:     { type: Number, required: true },
  year:      { type: Number },
  images:    [{ type: String }],  // ← array of image URLs
  stock:     { type: Number, default: 1 },
  speed:     { type: String },
  range:     { type: String },
}, { timestamps: true });
>>>>>>> 29776070a04a7776c1a795a9174e41c027bd0c40

module.exports = mongoose.model('Car', carSchema);
