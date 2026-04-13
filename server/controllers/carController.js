const Car = require('../models/Car');

exports.getFilteredCars = async (req, res) => {
    try {
        const { make, model, fuelType, minPrice, maxPrice } = req.query;
        let query = {};

        if (make) query.make = make;
        if (model) query.model = model;
        if (fuelType) query.fuelType = fuelType;
        
        if (minPrice || maxPrice) {
            query.price = {};
            if (minPrice) query.price.$gte = Number(minPrice);
            if (maxPrice) query.price.$lte = Number(maxPrice);
        }

        const cars = await Car.find(query);
        res.status(200).json(cars);
    } catch (err) {
        res.status(500).json({ error: "Server Error" });
    }
};