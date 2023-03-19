const Device_Lock = require("./models/Devices_Locks.js");

module.exports.addDevice_Lock = async (req, res, next, thermostat_id, device_id) => {
    try {
        const {
            is_active,
            lock_id,
            device_id,
        } = req.body;
        await Device_Lock.create({
            is_active,
            lock_id,
            device_id,
        });
        return { status: true };
    } catch (error) {
        next(error);
    }
};

module.exports.updateDevice_Lock = async(req, res, next) => {
    try{
        const {
            is_active,
            lock_id,
            device_id,
        } = req.body;
        const dev = await Device_Lock.findOneAndUpdate(
            {"device_id" : device_id},
            {"lock_id" : lock_id},
            {"is_active" : is_active}
        );
        return {message: "Success"};
    }catch (error){
        next(error);
    }
};
