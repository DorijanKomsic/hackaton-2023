const thermostatsDevices = require("../models/Devices_Thermostats");
const Device = require("./DeviceService");

module.exports.addDevice_Thermostat = async (req, res, next, thermostat_id, device_id) => {
    try {
        const {
            is_active,
            current_temperature,
            temperature,
        } = req.body;
        await thermostatsDevices.create({
            device_id,
            thermostat_id,
            is_active,
            current_temperature,
            temperature
        });
        return { status: true };
    } catch (error) {
        next(error);
    }
};

module.exports.updateDevice_Thermostat = async(req, res, next) => {
    try{
        const {
            device_id,
            thermostat_id,
            is_active,
            current_temperature,
            temperature
        } = req.body;
        const dev = await thermostatsDevices.findOneAndUpdate(
            {"device_id" : device_id},
            {"thermostat_id" : thermostat_id},
            {"is_active" : is_active},
            {"current_temperature" : current_temperature},
            {"temperature" : temperature}
        );
        return {message: "Success"};
    }catch (error){
        next(error);
    }
};

