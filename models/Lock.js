const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const LockSchema = new Schema({
    model: String,
    manafacturer: String,
    firmware_version: String,
    last_update: String
})

const Lock = mongoose.model('Lock', LockSchema);
module.exports = Lock