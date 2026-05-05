const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const authRoutes = require('./routes/authRoutes');
const tradeInRoutes = require('./routes/tradeInRoutes');
require('dotenv').config();

const userInteractionRoutes = require('./routes/userInteractionRoutes');

const app = express();
const PORT = process.env.PORT || 5000;
const URI = process.env.MONGO_URI;

app.use(cors());
app.use(express.json());
app.use('/api/auth', authRoutes);
app.use('/api/trade-in', tradeInRoutes);

// 1. DEFINE THE MODEL LOCALLY (To avoid import errors)
const Wishlist = mongoose.models.Wishlist || mongoose.model('Wishlist', new mongoose.Schema({
  userId: String,
  carId: String,
  type: String
}));

// 2. THE DELETE ROUTE (Placed FIRST so it's guaranteed to be found)
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

// 3. OTHER ROUTES
app.use('/api', userInteractionRoutes);

mongoose.connect(URI)
  .then(() => console.log("MongoDB connected! ✅"))
  .catch(err => console.log("MongoDB error: ❌", err));

app.listen(PORT, () => console.log(`Server running on port: ${PORT}`));
// Basic Route
app.get('/', (req, res) => {
  res.send('Server is running and Database is connected!');
});

// Existing routes (your already-done features)
const carRoutes = require('./routes/carRoutes');
app.use('/api/cars', carRoutes);

// New admin routes (Features 15, 16, 17, 18, 20)
const adminRoutes = require('./routes/adminRoutes');
app.use('/api/admin', adminRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});
