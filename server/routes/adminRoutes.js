const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');

// Feature 15 — VIN lookup & create listing
router.post('/cars/vin-lookup', adminController.vinLookup);
router.post('/cars', adminController.createCar);

// Feature 16 — Update car
router.patch('/cars/:id', adminController.updateCar);


module.exports = router;
