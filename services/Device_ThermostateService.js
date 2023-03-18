const Thermostats = require("../models/Thermostats.js");
const Device = require("./DeviceService");

module.exports.addDevice_Thermostat = async (req, res, next, thermostat_id, device_id) => {
    try {
        const {
            is_active,
            current_temperature,
            temperature,
        } = req.body;
        await Thermostats.create({
            device_id,
            thermostat_id,
            is_active,
            current_temperature,
            temperature
        });
        return res.json({ status: true });
    } catch (error) {
        next(error);
    }
};

