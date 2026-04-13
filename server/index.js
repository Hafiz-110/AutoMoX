const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const userInteractionRoutes = require('./routes/userInteractionRoutes');

const app = express();
app.use(cors());
app.use(express.json());

// connects to Mongodb Atlas
const uri = "mongodb://junayedazuz530_db_user:junayed1234@ac-qhy27iu-shard-00-00.k7uafec.mongodb.net:27017,ac-qhy27iu-shard-00-01.k7uafec.mongodb.net:27017,ac-qhy27iu-shard-00-02.k7uafec.mongodb.net:27017/?ssl=true&replicaSet=atlas-mkwvto-shard-0&authSource=admin&appName=Cluster0";

mongoose.connect(uri)
    .then(() => {
        console.log("-----------------------------------------");
        console.log("🚀 DATABASE STATUS: CONNECTED TO ATLAS");
        console.log("✅ Data is now permanent in the cloud!");
        console.log("-----------------------------------------");
    })
    .catch(err => {
        console.error("❌ Database Connection Error:", err);
    });

// Routes
app.use('/api', userInteractionRoutes);

// Start Server
const PORT = 5000;
app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
});