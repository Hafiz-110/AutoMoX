const Review = require('../models/Review');
const Wishlist = require('../models/Wishlist');

//Feature 11:Add Review
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
        const { type } = req.body;

        const updatedItem = await Wishlist.findOneAndUpdate(
            { carId: "123", userId: "User1" }, 
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

// Code for deletions

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


exports.deleteLastReview = async (req, res) => {
    try {
        await Review.findOneAndDelete({}, { sort: { _id: -1 } });
        res.status(200).json({ message: "Last review deleted!" });
    } catch (error) {
        res.status(500).json({ message: "Error deleting review" });
    }
};


exports.removeFromWishlist = async (req, res) => {
    try {
        const { wishlistId } = req.params;
        await Wishlist.findOneAndDelete({ wishlistId });
        res.status(200).json({ message: "Item removed from wishlist" });
    } catch (error) {
        res.status(500).json({ message: "Error removing item" });
    }
};