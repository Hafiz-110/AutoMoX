const express = require('express');
const router = express.Router();
const bookingController = require('../controllers/bookingController');

router.post('/book', bookingController.createBooking);
router.get('/my-bookings/:email', bookingController.getUserBookings); // New
router.delete('/cancel/:id', bookingController.deleteBooking);       // New

module.exports = router;