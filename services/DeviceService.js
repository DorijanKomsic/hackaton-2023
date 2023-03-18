const Device = require("../models/Devices.js");
const Device_Thermostat = require("../models/Device_Thermostat.js")

module.exports.addDevice = async (req, res, next) => {
    try {
        const {ip_address, mac_address} = req.body;
        const mac_check = await Device.findOne({ mac_address });
        if (mac_check)
            return res.json({ msg: "Device Already Exists", status: false });
        const d = await Device.create({
            ip_address,
            mac_address,
        });
        const d_id = d._id;
        return res.json({ status: true, id: d_id });
    } catch (error) {
        next(error);
    }
}; 

module.exports.getDevice = async (req, res, next) => {
    try{
        const id = req.body._id;
        const dev = await User.find({ id })
        return res.json(dev);
    }catch (error){
        next(error);
    }
};

module.exports.removeDevice = async (req, res, next) => {
    try{
        const id = req.body._id;
        const dev = await Device.findOneAndDelete({ id });
        return res.json({msg : "Success"});
    }catch (error){
        next(error);
    }
};

module.exports.getAllDevices = async (req, res, next) => {
    try{
        const dev = await User.find()
        return res.json(dev);
    }catch (error){
        next(error);
    }
};

module.exports.updateDevice = async (req, res, next) => {
    try{
        const dev = await User.find()
        return res.json(dev);
    }catch (error){
        next(error);
    }
};