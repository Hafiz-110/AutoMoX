const Review = require('../models/Review');
const Wishlist = require('../models/Wishlist');
const Car = require('../models/Car');

// Feature 11: Add Review
exports.addReview = async (req, res) => {
    try {
        const { rating, comment } = req.body;
        const newReview = new Review({
            reviewId: "REV-" + Date.now(),
            rating: rating || 5,
            comment: comment || "No comment",
            carId: "507f1f77bcf86cd799439011",
            userId: "507f1f77bcf86cd799439012"
        });
        await newReview.save();
        res.status(201).json({ message: "Review added successfully!", review: newReview });
    } catch (error) {
        res.status(500).json({ message: "Error adding review", error: error.message });
    }
};

// Feature 4: Add to Wishlist
exports.addToWishlist = async (req, res) => {
    try {
        const { carId, userId, type } = req.body;
        const updatedItem = await Wishlist.findOneAndUpdate(
            { carId: carId, userId: userId },
            {
                $set: { status: type || "wishlist" },
                $setOnInsert: { wishlistId: "WISH-" + Date.now() }
            },
            { upsert: true, new: true }
        );
        res.status(201).json({ item: updatedItem });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Delete last wishlist (test utility)
exports.deleteLastWishlist = async (req, res) => {
    try {
        const result = await Wishlist.deleteMany({
            carId: "123",
            userId: "User1"
        });
        res.status(200).json({ message: `Deleted ${result.deletedCount} items.` });
    } catch (error) {
        res.status(500).json({ message: "Error" });
    }
};

// Delete last review (test utility)
exports.deleteLastReview = async (req, res) => {
    try {
        await Review.findOneAndDelete({}, { sort: { _id: -1 } });
        res.status(200).json({ message: "Last review deleted!" });
    } catch (error) {
        res.status(500).json({ message: "Error deleting review" });
    }
};

// Feature 4: Remove from Wishlist
exports.removeFromWishlist = async (req, res) => {
    try {
        const { userId, carId } = req.params;
        console.log(`DELETE request received for User: ${userId}, Car: ${carId}`);
        const result = await Wishlist.findOneAndDelete({ userId, carId });
        if (result) {
            res.status(200).json({ message: "Removed successfully" });
        } else {
            res.status(404).json({ message: "Item not found in database" });
        }
    } catch (err) {
        res.status(500).json({ error: "Server error" });
    }
};

// Feature 1: Get car by ID
exports.getCarById = async (req, res) => {
    try {
        const car = await Car.findById(req.params.id);
        if (!car) return res.status(404).json({ message: "Car not found" });
        res.json(car);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Feature 1: Get all cars (with filters for Discovery page)
exports.getAllCars = async (req, res) => {
    try {
        const { make, model, fuelType, minPrice, maxPrice } = req.query;
        const filter = { status: { $ne: 'archived' } };

        if (make) filter.make = { $regex: make, $options: 'i' };
        if (model) filter.model = { $regex: model, $options: 'i' };
        if (fuelType) filter.fuelType = { $regex: fuelType, $options: 'i' };
        if (minPrice || maxPrice) {
            filter.price = {};
            if (minPrice) filter.price.$gte = Number(minPrice);
            if (maxPrice) filter.price.$lte = Number(maxPrice);
        }

        const cars = await Car.find(filter);
        res.json(cars);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Feature 18: Track car view (for analytics)
exports.trackView = async (req, res) => {
    try {
        const car = await Car.findByIdAndUpdate(
            req.params.id,
            { $inc: { views: 1 } },
            { new: true }
        );
        if (!car) return res.status(404).json({ message: 'Car not found' });
        res.json(car);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};