const mongoose = require('mongoose');

const PermissionsSchema = new mongoose.Schema({
    profile_id: {
        type: String,//Schema.Types.ObjectId,
        required: true,
    },
    device_id: {
        type: String,//Schema.Types.ObjectId,
        required: true,
    },
    createdAt: {
        type: Date,
        unique: true
    }
});

module.exports = mongoose.model("Permissions", PermissionsSchema);