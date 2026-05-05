const express = require('express');
const router = express.Router();

// Feature 14: Calculate total price with add-ons
router.post('/calculate', (req, res) => {
    const { basePrice, addons } = req.body;
    let total = basePrice;

    if (addons.rims) total += 1500;
    if (addons.interior) total += 2500;

    res.json({ totalPrice: total });
});

module.exports = router;