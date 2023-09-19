import mongoose from 'mongoose';
const { Schema } = mongoose;

const noteSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    tag: {
        type: String,
        default: "General",
    },
    date: {
        type: Date,
        default: Date.now,
    }

});

module.exports = Notes = mongoose.model('notes', noteSchema);