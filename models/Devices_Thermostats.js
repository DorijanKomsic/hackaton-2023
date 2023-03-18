const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const DeviceThermostatsSchema = new Schema({
    is_active:{ 
        type: Boolean,
        default : false
    },
    current_temperature:{ 
        type: Number,
        trim: true
    },
    temperature:{ 
        type: Number,
        trim: true
    },
});

module.exports = mongoose.model('DeviceThermostats', DeviceThermostatsSchema);