const Thermostats = require("../models/Thermostats.js");
const Device = require("./DeviceService");
const Device_Thermostat = require('./Device_ThermostateService')


module.exports.addThermostat = async (req, res, next) => {

  try {
    const {
      model,
      manufacturer,
      firmware_version,
      last_update,
      hvac
    } = req.body;

    console.log(req.body);
    const check = await Thermostats.findOne({
      model,
      manufacturer,
      firmware_version,
      last_update,
      hvac
    });

    console.log("line 28")

    if (!check) {
      const t = new Thermostats({
        model,
        manufacturer,
        firmware_version,
        last_update,
        hvac
      });

      console.log("line 37");

      const t_id = t._id;

      const result = await Device.addDevice(req, res, next);

      if (!result.status) {
        throw new Error('Error adding device');
      }
      console.log("line 48");
      const d_id = result.id;

      const result2 = await Device_Thermostat.addDevice_Thermostat(req, res, next, t_id, d_id);

      if (!result2.status) {
        throw new Error('Error adding device to thermostat');
      }

      res.json({ status: true });
    } else {
      const t_id = check._id;

      const result = await Device.addDevice(req, res, next);

      if (!result.status) {
        throw new Error('Error adding device');
      }

      console.log("line 71");

      const d_id = result.id;

      const result2 = await Device_Thermostat.addDevice_Thermostat(req, res, next, t_id, d_id);

      if (!result2.status) {
        throw new Error('Error adding device to thermostat');
      }


      res.json({ status: true });
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

module.exports.getThermostat = async (req, res, next) => {
    try{
        const d_id = req.body.device_id;
        const t_id = req.body.lock_id;
        const thermostatdevice = await Device_Thermostat.findOne({ t_id, d_id });
        const thermostat = await Thermostats.findOne({t_id});
        const device = await Device.findOne({ d_id });
        const result = {
            "device" : device, 
            "thermostat" : thermostat,
            "thermostatdevice" : thermostatdevice
        };
        return res.json(result);
    }catch (error){
        next(error);
    }
};