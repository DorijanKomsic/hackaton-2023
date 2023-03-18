const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const DeviceLightsSchema = new Schema({
    is_active: {
        type: Boolean,
        default: false
    },
    light_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Lights'
    },
    device_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Devices'
    }
});

module.exports = mongoose.model('DeviceLights', DeviceLightsSchema);