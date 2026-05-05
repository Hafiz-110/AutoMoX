const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const authRoutes = require('./routes/authRoutes');
const tradeInRoutes = require('./routes/tradeInRoutes');
const personalizationRoutes = require('./routes/personalizationRoutes');
const carRoutes = require('./routes/carRoutes');
const adminRoutes = require('./routes/adminRoutes');
const userInteractionRoutes = require('./routes/userInteractionRoutes');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;
const URI = process.env.MONGO_URI;

// Middleware
app.use(cors());
app.use(express.json());

// Inline Wishlist model (keeping your fix)
const Wishlist = mongoose.models.Wishlist || mongoose.model('Wishlist', new mongoose.Schema({
  userId: String,
  carId: String,
  type: String
}));

// Basic Route
app.get('/', (req, res) => {
  res.send('Server is running and Database is connected!');
});

// All Routes - registered BEFORE app.listen()
app.use('/api/auth', authRoutes);
app.use('/api/trade-in', tradeInRoutes);
app.use('/api/personalize', personalizationRoutes);
app.use('/api/cars', carRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api', userInteractionRoutes);

// Wishlist delete route
app.delete('/api/remove-wishlist/:userId/:carId', async (req, res) => {
  console.log(`---> DELETE CALL RECEIVED: User: ${req.params.userId}, Car: ${req.params.carId}`);
  try {
    const { userId, carId } = req.params;
    const result = await Wishlist.findOneAndDelete({ userId, carId });
    if (result) {
      res.status(200).json({ message: "Deleted" });
    } else {
      res.status(404).json({ message: "Not found in DB" });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// DB Connection + Single app.listen()
mongoose.connect(URI)
  .then(() => {
    console.log("MongoDB connected! ✅");
    app.listen(PORT, () => console.log(`Server running on port: ${PORT}`));
  })
  .catch(err => console.log("MongoDB error: ❌", err));