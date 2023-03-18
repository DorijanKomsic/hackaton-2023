const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const DeviceLocksSchema = new Schema({
    is_active:{
        type : Boolean,
        default : false
    },
    lock_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Locks'
    },
    device_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Devices'
    }
});

module.exports = mongoose.model('DeviceLocks', DeviceLocksSchema);