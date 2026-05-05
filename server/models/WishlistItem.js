const mongoose = require('mongoose');

const wishlistItemSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    carId: { type: mongoose.Schema.Types.ObjectId, ref: 'Car', required: true },
    priceAtAdd: { type: Number, required: true },   // price when user wishlisted it
    notified: { type: Boolean, default: false },     // whether price-drop email was sent
    addedAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('WishlistItem', wishlistItemSchema);
