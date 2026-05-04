const express = require('express');
const router = express.Router();
const controller = require('../controller/userInteractionController');

// 1. POST Routes
router.post('/add-review', controller.addReview);
router.post('/add-wishlist', controller.addToWishlist);

// 2. DELETE Routes 

router.delete('/delete-last-review', controller.deleteLastReview);
router.delete('/delete-last-wishlist', controller.deleteLastWishlist);

// 3. GET Routes
router.get('/cars/:id', controller.getCarById);
// backend/routes/userInteractionRoutes.js

// Change the old 'remove-watchlist/:wishlistId' to this:
router.delete('/remove-wishlist/:userId/:carId', controller.removeFromWishlist);

module.exports = router;