const Car = require('../models/Car');
const WishlistItem = require('../models/WishlistItem');
const { sendPriceDropEmail } = require('../utils/emailService');

// ─────────────────────────────────────────────
// Feature 15: Add car by VIN (auto-populate data)
// POST /api/admin/cars/vin-lookup
// ─────────────────────────────────────────────
exports.vinLookup = async (req, res) => {
    const { vin } = req.body;
    if (!vin || vin.length !== 17) {
        return res.status(400).json({ error: 'A valid 17-character VIN is required.' });
    }

    try {
        // Check for duplicate VIN
        const existing = await Car.findOne({ vin: vin.toUpperCase() });
        if (existing) {
            return res.status(409).json({ error: 'A car with this VIN already exists in inventory.' });
        }

        // Call NHTSA free public API to decode VIN
        const nhtsaUrl = `https://vpic.nhtsa.dot.gov/api/vehicles/decodevin/${vin}?format=json`;
        const response = await fetch(nhtsaUrl);
        const data = await response.json();

        if (!data.Results) {
            return res.status(502).json({ error: 'Could not reach VIN decode service.' });
        }

        const results = data.Results;
        const get = (variable) => {
            const found = results.find(r => r.Variable === variable);
            return found && found.Value && found.Value !== 'Not Applicable' ? found.Value : null;
        };

        const decoded = {
            vin: vin.toUpperCase(),
            make: get('Make'),
            model: get('Model'),
            year: get('Model Year') ? parseInt(get('Model Year')) : null,
            bodyStyle: get('Body Class'),
            engineType: get('Engine Configuration'),
            transmission: get('Transmission Style'),
            drivetrain: get('Drive Type'),
            fuelType: get('Fuel Type - Primary'),
        };

        res.status(200).json({ message: 'VIN decoded successfully.', data: decoded });
    } catch (err) {
        console.error('VIN lookup error:', err);
        res.status(500).json({ error: 'Server error during VIN lookup.' });
    }
};

// ─────────────────────────────────────────────
// Feature 15: Create new car listing
// POST /api/admin/cars
// ─────────────────────────────────────────────
exports.createCar = async (req, res) => {
    try {
        const car = new Car(req.body);
        await car.save();
        res.status(201).json({ message: 'Car listing created successfully.', car });
    } catch (err) {
        if (err.code === 11000) {
            return res.status(409).json({ error: 'A car with this VIN already exists.' });
        }
        res.status(500).json({ error: 'Failed to create car listing.', details: err.message });
    }
};

// ─────────────────────────────────────────────
// Feature 16: Update car (price, stock, specs)
// PATCH /api/admin/cars/:id
// ─────────────────────────────────────────────
exports.updateCar = async (req, res) => {
    try {
        const { id } = req.params;
        const updates = req.body;

        // Prevent overwriting VIN
        delete updates.vin;

        const oldCar = await Car.findById(id);
        if (!oldCar) return res.status(404).json({ error: 'Car not found.' });

        const oldPrice = oldCar.price;

        const updatedCar = await Car.findByIdAndUpdate(id, updates, { new: true, runValidators: true });

        // Feature 20: If price dropped, notify wishlisted users
        if (updates.price && updates.price < oldPrice) {
            const wishlistItems = await WishlistItem.find({ carId: id, notified: false })
                .populate('userId', 'email name')
                .populate('carId', 'make model year price images');

            for (const item of wishlistItems) {
                if (item.userId && item.userId.email) {
                    await sendPriceDropEmail({
                        to: item.userId.email,
                        userName: item.userId.name || 'Valued Customer',
                        car: updatedCar,
                        oldPrice,
                        newPrice: updates.price,
                    });
                    await WishlistItem.findByIdAndUpdate(item._id, { notified: true });
                }
            }
        }

        res.status(200).json({ message: 'Car updated successfully.', car: updatedCar });
    } catch (err) {
        res.status(500).json({ error: 'Failed to update car.', details: err.message });
    }
};

// ─────────────────────────────────────────────


// ─────────────────────────────────────────────