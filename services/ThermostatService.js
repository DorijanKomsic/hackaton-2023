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
        const check = await Thermostats.findOne({
            model, 
            manufacturer, 
            firmware_version, 
            last_update, 
            hvac
        });
        if(!check){
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
        }
        else{
            const t_id = check._id;
            const result = await Device.addDevice(req, res, next);
            const d_id = result.id;
            const result2 = await Device.addDevice_Thermostat(req, res, next, t_id, d_id);
            if(result2.status){
                return res.json({ status: true });
            }
        }          
    } catch (error) {
        next(error);
    }
};

module.exports.updateDevice_Thermostat = async(req, res, next) => {
    try{
        const {
            model, 
            manufacturer, 
            firmware_version, 
            last_update, 
            hvac
        } = req.body;
        const dev = await Thermostats.findOneAndUpdate(
            {"model" : model},
            {"manufacturer" : manufacturer},
            {"firmware_version" : firmware_version},
            {"last_update" : last_update},
            {"hvac" : hvac}
        );
        return {message: "Success"};
    }catch (error){
        next(error);
    }
};

