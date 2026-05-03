const mongoose = require('mongoose');

const carSchema = new mongoose.Schema({
    make: { type: String, required: true },
    model: { type: String, required: true },
    fuelType: { type: String, required: true },
    price: { type: Number, required: true },
    year: { type: Number, required: true },
    images: [{ type: String }], 
    vin: { type: String, required: true, unique: true }
});

module.exports = mongoose.model('Car', carSchema);