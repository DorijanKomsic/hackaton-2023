const Light = require("../models/Lights.js");
const Device = require("./DeviceService");
const Device_Light = require('./Device_LightService')


module.exports.addLight = async (req, res, next) => {

  try {
    const {
      model,
      manufacturer,
      color,
    } = req.body;

    console.log(req.body);
    const check = await Light.findOne({
      model,
      manufacturer,
      color,
    });

    console.log("line 28")

    if (!check) {
      const t = new Light({
      model,
      manufacturer,
      color,
      });

      console.log("line 37");

      const t_id = t._id;

      const result = await Device.addDevice(req, res, next);

      if (!result.status) {
        throw new Error('Error adding device');
      }
      console.log("line 48");
      const d_id = result.id;

      const result2 = await Device_Light.addDevice_Light(req, res, next, t_id, d_id);

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

      const result2 = await Device_Light.addDevice_Light(req, res, next, t_id, d_id);

      if (!result2.status) {
        throw new Error('Error adding device to thermostat');
      }


      res.json({ status: true });
    }
  } catch (error) {
    next(error);
  }
};


module.exports.updateLight = async(req, res, next) => {
    try{
        const {
            model,
            manufacturer,
            color,
        } = req.body;
        const dev = await Lights.findOneAndUpdate(
            {"model" : model},
            {"manufacturer" : manufacturer},
            {"color" : color}
        );
        await Device_Light.updateDevice_Light(req, res, next);
        await Device.updateDevice(req, res, next);
        return {message: "Success"};
    }catch (error){
        next(error);
    }
};

module.exports.getLight = async (req, res, next) => {
    try{
        const d_id = req.body.device_id;
        const l_id = req.body.light_id;
        const lightdevice = await Device_Light.findOne({ l_id, d_id });
        const light = await Light.findOne({l_id});
        const device = await Device.findOne({ d_id });
        const result = {
            "device" : device, 
            "light" : light,
            "lightdevice" : lightdevice
        };
        return res.json(result);
    }catch (error){
        next(error);
    }
};