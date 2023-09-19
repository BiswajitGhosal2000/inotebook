const mongoose = require('mongoose');
const dotenv = require('dotenv');
const mongoUri = 'mongodb+srv://ghosalbiswajit11:d1BeLisOWnx2vdpJ@inotebook.tpebnqj.mongodb.net/notes?retryWrites=true&w=majority';

const connectDB = async () => {
    mongoose.connect(mongoUri)
    console.log("Connected to MongoDB on Atlas");
}

module.exports = connectDB;