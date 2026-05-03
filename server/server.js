const express = require('express');
const mongoose = require('mongoose'); // New
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;
const URI = process.env.MONGO_URI;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose.connect(URI)
  .then(() => console.log("MongoDB database connection established successfully! ✅"))
  .catch(err => console.log("MongoDB connection error: ❌", err));

// Basic Route
app.get('/', (req, res) => {
  res.send('Server is running and Database is connected!');
});

app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});
