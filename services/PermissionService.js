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

module.exports.removePermissions = async (res, req, next) => {
    try {
        const { permissionIds } = req.body;
        await permissions.deleteMany({ _id: { $in: permissionIds } });
        res.json( {status: true} );
    } catch(error) {
        next(error);
    }
}

module.exports.listPeopleWithPermissions = async (res, req) => {
    const { device_id } = req.params;
    try {
        const permissions = await Permissions.find({ device_id }).populate('profile_id');
        const profiles = permissions.map(p => p.profile_id);
    res.json({ profiles });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error' });
    }
}