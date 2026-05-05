const express = require('express');
const router = express.Router();
const controller = require('../controller/userInteractionController');

// POST Routes
router.post('/add-review', controller.addReview);
router.post('/add-wishlist', controller.addToWishlist);

// DELETE Routes
router.delete('/delete-last-review', controller.deleteLastReview);
router.delete('/delete-last-wishlist', controller.deleteLastWishlist);
router.delete('/remove-wishlist/:userId/:carId', controller.removeFromWishlist);

// GET Routes (exact before parameterized)
router.get('/cars', controller.getAllCars);
router.get('/cars/:id', controller.getCarById);
router.patch('/cars/:id/view', controller.trackView);

module.exports = router;