const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// 1. Middleware
app.use(cors());
app.use(express.json());

// 2. Register Models (Crucial to do this before routes)
require('./models/User'); 
require('./models/Verification');

// 3. Routes
const adminRoutes = require('./routes/adminRoutes');
app.use('/api/admin', adminRoutes);

// 4. MongoDB Connection
const MONGO_URI = "mongodb://Hafiz_db_user:hafiz1234@ac-qhy27iu-shard-00-00.k7uafec.mongodb.net:27017,ac-qhy27iu-shard-00-01.k7uafec.mongodb.net:27017,ac-qhy27iu-shard-00-02.k7uafec.mongodb.net:27017/?ssl=true&replicaSet=atlas-mkwvto-shard-0&authSource=admin&appName=Cluster0";

mongoose.connect(MONGO_URI)
  .then(() => console.log("MongoDB database connection established successfully! ✅"))
  .catch(err => console.log("MongoDB connection error: ❌", err));

app.get('/', (req, res) => {
  res.send('Server is running and Database is connected!');
});

app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});