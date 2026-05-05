const mongoose = require('mongoose');

const carSchema = new mongoose.Schema({
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

module.exports = mongoose.model('Car', carSchema);