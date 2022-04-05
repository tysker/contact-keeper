const mongoose = require('mongoose');

const ContactSchema = mongoose.Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId, // ObjectId is the id mongodb creates when new data is persisted
        ref: "users" // reference to a specific object in mongodb
    },
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    phone: {
        type: String,
    },
    type: {
        type: String,
        default: "personal",
        required: true
    },
    date: {
        type: Date,
        default: Date.now(),
    },
});

module.exports = mongoose.model('contact', ContactSchema);
