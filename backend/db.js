const mongoose = require('mongoose');
require('dotenv').config();
const mongoUri = process.env.MONGO_URI;

const connectDB = async () => {
    mongoose.connect(mongoUri)
    console.log("Connected to MongoDB");
}

module.exports = connectDB;