const express = require('express');
const router = express.Router();
const controller = require('../controller/userInteractionController');

// 1. POST Routes
router.post('/add-review', controller.addReview);
router.post('/add-wishlist', controller.addToWishlist);

// 2. DELETE Routes 

router.delete('/delete-last-review', controller.deleteLastReview);
router.delete('/delete-last-wishlist', controller.deleteLastWishlist);


router.delete('/remove-watchlist/:wishlistId', controller.removeFromWishlist);

module.exports = router;