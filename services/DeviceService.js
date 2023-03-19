const Device = require("../models/Devices.js");
const Device_Thermostat = require("../models/Devices_Thermostats");
const Thermostats = require("../models/Thermostats.js");
const Permissions = require("../models/Permissions.js");

module.exports.addDevice = async (req, res, next) => {
    try {
        const ip_address = req.body.device.ip_address;
        const mac_address = req.body.device.mac_address;
        const mac_check = await Device.findOne({ mac_address });
        if (mac_check)
            return res.json({ msg: "Device Already Exists", status: false });
        const d = await Device.create({
            ip_address,
            mac_address,
        });
        const d_id = d._id;
        return { status: true, id: d_id };
    } catch (error) {
        next(error);
    }
}; 

module.exports.getDevice = async (req, res, next) => {
    try{
        const d_id = req.body.device_id;
        const t_id = req.body.thermostat_id;
        const thermostatdevice = await Device_Thermostat.findOne({ t_id, d_id });
        const thermostat = await Thermostats.findOne({t_id});
        const device = await Device.findOne({ d_id });
        const result = {
            "device" : device, 
            "thermostat" : thermostat,
            "thermostat_device" : thermostatdevice
        };
        return res.json(result);
    }catch (error){
        next(error);
    }
};

module.exports.removeDevice = async (req, res, next) => {
    try{
        const p_id = req.body.profile_id;
        const d_id = req.body.device_id;
        const t_id = req.body.thermostat_id;
        await Permissions.findOneAndDelete({ d_id, p_id });
        await Device.findOneAndDelete({ d_id });
        return res.json({msg : "Success"});
    }catch (error){
        next(error);
    }
};

module.exports.getAllDevices = async (req, res, next) => {
    try{
        const dev = await Device.find();
        return res.json(dev);
    }catch (error){
        next(error);
    }
};

module.exports.updateDevice = async (req, res, next) => {
    try{
        const {ip_address, mac_address} = req.body;
        const dev = await Device.findOneAndUpdate(
            {"ip_address" : ip_address},
            {"mac_address" : mac_address}
        );
        await Device_Thermostat.updateDevice_Thermostat(req, res, next);
        await Thermostats.updateThermostat(req, res, next);
        return res.json({message: "Success"});
    }catch (error){
        next(error);
    }
};