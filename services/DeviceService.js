const Device = require("../models/Devices.js");

module.exports.addDevice = async (req, res, next) => {
    try {
        const {ip_address, mac_address} = req.body;
        const mac_check = await Device.findOne({ mac_address });
        if (mac_check)
            return res.json({ msg: "Device Already Exists", status: false });
        await Device.create({
            ip_address,
            mac_address,
        });
        return res.json({ status: true });
    } catch (error) {
        next(error);
    }
};