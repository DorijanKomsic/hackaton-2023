const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const DeviceLightsSchema = new Schema({
    is_active : {
        type : Boolean,
        default : false
    }
});

module.exports = mongoose.model('DeviceLights', DeviceLightsSchema);