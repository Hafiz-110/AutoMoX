const mongoose = require('mongoose');

const verificationSchema = new mongoose.Schema({
    user: { 
        type: String, // Changed to String so it accepts "Abi" directly
        required: true 
    },
    documentType: { 
        type: String, 
        required: true, 
        enum: ['NID', 'Driving License', 'Passport'] 
    },
    fileUrl: { type: String, required: true },
    status: { 
        type: String, 
        enum: ['Pending', 'Approved', 'Rejected'], 
        default: 'Pending' 
    },
    adminComment: { type: String, default: "" }
}, { timestamps: true });

module.exports = mongoose.model('Verification', verificationSchema);