const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const LightSchema = new Schema({
    model: String,
    manufacturer: String,
    color: String
})