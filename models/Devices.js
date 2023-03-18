const mongoose = require('mongoose');
const validator = require('validator');
const generalConfig = require('');

const DevicesSchema = new mongoose.Schema({
    ip_address: {
        type: String,
        required: [true, 'IP Address can\'t be empty'],
    },
    mac_address: {
        type: String,
        required: [true, 'MacAddress can\'t be empty'],
        unique: true
    },
    createdAt: {
        type: Date,
        unique: true
    }
});

module.exports = mongoose.model("Devices", DevicesSchema);