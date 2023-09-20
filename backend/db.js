const mongoose = require('mongoose');
// const dotenv = require('dotenv');
const mongoUri = 'mongodb://127.0.0.1:27017/notebook?readPreference=primary&appname=MongoDB%20Compass&ssl=false'
//const mongoUri = 'mongodb+srv://ghosalbiswajit11:d1BeLisOWnx2vdpJ@inotebook.tpebnqj.mongodb.net/notes?retryWrites=true&w=majority';

const connectDB = async () => {
    mongoose.connect(mongoUri)
    console.log("Connected to MongoDB on mongodb://localhost:27017");
}

module.exports = connectDB;