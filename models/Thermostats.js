const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const ThermostatsSchema = new Schema({
    model:{ 
        type:String,
        trim: true
    },
    manufacturer:{ 
        type:String,
        trim: true
    },
    firmware_version:{ 
        type:String,
        trim: true
    },
    last_update:{ 
        type:String,
        trim: true
    },
    hvac:{ 
        type:String,
        trim: true
    },
    createdAt: {
        type: Date,
        unique: true
    }
});

ThermostatsSchema.index({model: 1}, {unique: true});

module.exports = mongoose.model('Thermostat', ThermostatsSchema);