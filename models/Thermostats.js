const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const ThermostatsSchema = new Schema({
    model: String,
    manufacturer: String,
    firmware_version: String,
    last_update: String,
    hvac: String
});

const Thermostat = mongoose.model('Thermostat', ThermostatsSchema)
module.exports = Thermostat