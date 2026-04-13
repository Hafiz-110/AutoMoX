const mongoose = require('mongoose');

const wishlistSchema = new mongoose.Schema({
  
  wishlistId: {
    type: String,
    required: true,
    unique: true
  },
  
  addedDate: {
    type: Date,
    default: Date.now
  },
  
  status: {
    type: String,
    default: 'watch'
  },
  
  userId: {
    type: String, 
    required: true
  },
  carId: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model('Wishlist', wishlistSchema);