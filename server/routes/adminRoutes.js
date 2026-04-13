const express = require('express');
const router = express.Router();
const Verification = require('../models/Verification');
// Ensure User model is loaded so populate works
require('../models/User'); 

// Fetch all pending documents with User details
router.get('/pending-verifications', async (req, res) => {
    try {
        // This looks at the 'user' ID, goes to the 'users' collection, 
        // and grabs the 'name' for you.
        const pending = await Verification.find({ status: 'Pending' })
            .populate('user', 'name'); 
        
        res.json(pending);
    } catch (err) {
        res.status(500).json({ message: "Server Error", error: err.message });
    }
});

// Update status (Approve/Reject)
// Renamed to /update-status/:id to match your Frontend API call
router.patch('/update-status/:id', async (req, res) => {
    const { status, adminComment } = req.body;
    try {
        const updated = await Verification.findByIdAndUpdate(
            req.params.id,
            { status, adminComment },
            { new: true }
        );
        
        if (!updated) {
            return res.status(404).json({ message: "Verification record not found" });
        }

        res.json(updated);
    } catch (err) {
        res.status(400).json({ message: "Update Failed", error: err.message });
    }
});

module.exports = router;