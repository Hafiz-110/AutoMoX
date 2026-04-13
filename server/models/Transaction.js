const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema({
    user: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User', 
        required: true 
    },
    car: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Car', 
        required: true 
    },
    amount: { type: Number, required: true },
    tran_id: { type: String, required: true, unique: true },
    status: { 
        type: String, 
        enum: ['Pending', 'Success', 'Failed', 'Cancelled'], 
        default: 'Pending' 
    },
    payment_type: { type: String, default: 'Booking Fee' }
}, { timestamps: true });

module.exports = mongoose.model('Transaction', transactionSchema);