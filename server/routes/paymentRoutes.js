const express = require('express');
const router = express.Router();
const SSLCommerzPayment = require('sslcommerz-lts');
const Transaction = require('../models/Transaction');

// Define credentials outside, but they will only be populated if dotenv.config() 
// was called in server.js before this file was required.
const store_id = process.env.STORE_ID;
const store_passwd = process.env.STORE_PASS;
const is_live = false; 

/**
 * Initiate Payment
 */
router.post('/init', async (req, res) => {
    const tran_id = `REF-${Date.now()}`;
    const { amount, userId, carId, userName, userEmail } = req.body;

    // Validation
    if (!userId || !carId) {
        return res.status(400).json({ message: "userId and carId are required" });
    }

    const data = {
        total_amount: amount || 1000,
        currency: 'BDT',
        tran_id: tran_id,
        success_url: `http://localhost:5000/api/payment/success/${tran_id}`,
        fail_url: `http://localhost:5000/api/payment/fail/${tran_id}`,
        cancel_url: `http://localhost:5000/api/payment/cancel/${tran_id}`,
        ipn_url: 'http://localhost:5000/api/payment/ipn',
        shipping_method: 'Courier',
        product_name: 'Car Booking',
        product_category: 'Automobile',
        product_profile: 'general',
        cus_name: userName || 'Customer',
        cus_email: userEmail || 'customer@example.com',
        cus_add1: 'Dhaka',
        cus_add2: 'Dhaka', // Added just in case
        cus_city: 'Dhaka',
        cus_state: 'Dhaka', // Added
        cus_postcode: '1000',
        cus_country: 'Bangladesh',
        cus_phone: '01700000000',
        ship_name: userName || 'Customer',
        ship_add1: 'Dhaka',
        ship_add2: 'Dhaka', // Added
        ship_city: 'Dhaka',
        ship_state: 'Dhaka',
        ship_postcode: '1000', // Changed this to a STRING
        ship_country: 'Bangladesh',
    };

    const sslcz = new SSLCommerzPayment(store_id, store_passwd, is_live);
    
    try {
        const apiResponse = await sslcz.init(data);
        
        if (apiResponse?.GatewayPageURL) {
            const newTransaction = new Transaction({
                user: userId,
                car: carId,
                amount: data.total_amount,
                tran_id: tran_id,
                status: 'Pending'
            });
            await newTransaction.save();
            res.send({ url: apiResponse.GatewayPageURL });
        } else {
            // --- ADDED DEBUG LINE BELOW ---
            console.error("SSLCommerz Error Response:", apiResponse); 
            res.status(400).json({ 
                message: "SSLCommerz Session Failed", 
                error: apiResponse // Sending this back to Postman helps you debug instantly
            });
        }
    } catch (error) {
        res.status(500).json({ message: "Internal Error", error: error.message });
    }
});

/**
 * Success Route
 */
router.post('/success/:tranId', async (req, res) => {
    try {
        await Transaction.updateOne(
            { tran_id: req.params.tranId }, 
            { $set: { status: 'Success' } }
        );
        res.redirect(`http://localhost:5173/payment/success`);
    } catch (err) {
        res.status(500).send("Error updating transaction");
    }
});

module.exports = router;