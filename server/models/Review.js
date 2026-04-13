const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
  
  reviewId: {
    type: String,
    required: true,
    unique: true
  },
  
  rating: {
    type: Number,
    required: true,
    min: 1,
    max: 5
  },
  
  comment: {
    type: String,
    required: true
  },
  
  date: {
    type: Date,
    default: Date.now
  },
  
  carId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Car',
    required: true
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
});

module.exports = mongoose.model('Review', reviewSchema);