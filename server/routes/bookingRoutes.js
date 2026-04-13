const express = require('express');
const router = express.Router();
const bookingController = require('../controllers/bookingController');

// POST /api/bookings/book
router.post('/book', bookingController.createBooking);

module.exports = router;