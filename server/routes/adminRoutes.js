const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');

// Feature 15 — VIN lookup & create listing
router.post('/cars/vin-lookup', adminController.vinLookup);
router.post('/cars', adminController.createCar);

// Feature 16 — Update car
router.patch('/cars/:id', adminController.updateCar);

// Feature 17 — Delete or Archive car
// DELETE /api/admin/cars/:id          → permanent delete
// DELETE /api/admin/cars/:id?archive=true  → archive
router.delete('/cars/:id', adminController.deleteCar);

// Feature 18 — Analytics dashboard data
router.get('/analytics', adminController.getAnalytics);

module.exports = router;
