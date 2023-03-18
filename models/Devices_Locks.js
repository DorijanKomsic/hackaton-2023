const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const DeviceLocksSchema = new Schema({
    is_active:{
        type : Boolean,
        default : false
    }
});

module.exports = mongoose.model('DeviceLocks', DeviceLocksSchema);