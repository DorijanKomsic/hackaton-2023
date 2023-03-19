const profiles = require('../models/Profiles');
const devices = require('../models/Devices');
const permissions = require('../models/Permissions');

module.exports.addPermission = async (res, req, next, profile_id, device_id) => {
    try {
        await profiles.findById(profile_id);
        await devices.findById(device_id);

        const instance = await permissions.create({
            profile_id,
            device_id
        });

        return {instance};
    }

    catch(error) {
        next(error);
    }
}