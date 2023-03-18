const Thermostats = require("../models/Thermostats.js");
const Device = require("./DeviceService");

module.exports.addThermostat = async (req, res, next) => {
    try {

        const {
            model, 
            manufacturer, 
            firmware_version, 
            last_update, 
            hvac
        } = req.body;
        const t = await Thermostats.create({
            model, 
            manufacturer, 
            firmware_version, 
            last_update, 
            hvac
        });
        const t_id = t._id;
        const result = await Device.addDevice(req, res, next);
        const d_id = result.id;
        if(result.status){
            const result2 = await Device.addDevice_Thermostat(req, res, next, t_id, d_id);
            if(result2.status){
                return res.json({ status: true });
            }
        }
    } catch (error) {
        next(error);
    }
};

