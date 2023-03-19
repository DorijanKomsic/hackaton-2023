const Lock = require("../models/Locks.js");
const Device = require("./DeviceService");
const Device_Lock = require('./Device_LockService')

module.exports.addLock = async (req, res, next) => {

  try {
    const {
        model,
        manufacturer,
        firmware_version,
        last_update
    } = req.body;

    console.log(req.body);
    const check = await Lock.findOne({
        model,
        manufacturer,
        firmware_version,
        last_update
    });

    console.log("line 28")

    if (!check) {
      const t = new Lock({
        model,
        manufacturer,
        firmware_version,
        last_update
      });

      console.log("line 37");

      const t_id = t._id;

      const result = await Device.addDevice(req, res, next);

      if (!result.status) {
        throw new Error('Error adding device');
      }
      console.log("line 48");
      const d_id = result.id;

      const result2 = await Device_Light.addDevice_Lock(req, res, next, t_id, d_id);

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

      const result2 = await Device_Light.addDevice_Lock(req, res, next, t_id, d_id);

      if (!result2.status) {
        throw new Error('Error adding device to thermostat');
      }


      res.json({ status: true });
    }
  } catch (error) {
    next(error);
  }
};


module.exports.updateLock = async(req, res, next) => {
    try{
        const {
            model,
            manufacturer,
            firmware_version,
            last_update
        } = req.body;
        const dev = await Lock.findOneAndUpdate(
            {"model" : model},
            {"manufacturer" : manufacturer},
            {"firmware_version" : firmware_version},
            {"last_update" : last_update}
        );
        return {message: "Success"};
    }catch (error){
        next(error);
    }
};

module.exports.getLock = async (req, res, next) => {
    try{
        const d_id = req.body.device_id;
        const l_id = req.body.lock_id;
        const lockdevice = await Device_Lock.findOne({ l_id, d_id });
        const lock = await Lock.findOne({l_id});
        const device = await Device.findOne({ d_id });
        const result = {
            "device" : device, 
            "lock" : lock,
            "lockdevice" : lockdevice
        };
        await Device_Lock.updateDevice_Lock(req, res, next);
        await Device.updateDevice(req, res, next);
        return res.json(result);
    }catch (error){
        next(error);
    }
};