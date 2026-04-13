const express = require('express');
const router = express.Router();
const carController = require('../controllers/carController');

// This connects the URL /api/cars/ to your filtering logic
router.get('/', carController.getFilteredCars);

module.exports = router;