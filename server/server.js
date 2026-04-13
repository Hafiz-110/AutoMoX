require('dotenv').config(); // 1. THIS MUST BE LINE 1
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const paymentRoutes = require('./routes/paymentRoutes'); // 2. Load routes AFTER dotenv

const app = express();
// ... rest of your code
const PORT = process.env.PORT || 5000;
const URI = process.env.MONGO_URI;



// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose.connect("mongodb://Hafiz_db_user:hafiz1234@ac-qhy27iu-shard-00-00.k7uafec.mongodb.net:27017,ac-qhy27iu-shard-00-01.k7uafec.mongodb.net:27017,ac-qhy27iu-shard-00-02.k7uafec.mongodb.net:27017/?ssl=true&replicaSet=atlas-mkwvto-shard-0&authSource=admin&appName=Cluster0")
  .then(() => console.log("MongoDB database connection established successfully! ✅"))
  .catch(err => console.log("MongoDB connection error: ❌", err));
// Use payment routes
app.use('/api/payment', paymentRoutes);
// Basic Route
app.get('/', (req, res) => {
  res.send('Server is running and Database is connected!');
});

app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});
