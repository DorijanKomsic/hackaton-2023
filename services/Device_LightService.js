const Device_Light = require("./models/Devices_Lights.js");

module.exports.addDevice_Light = async (req, res, next, thermostat_id, device_id) => {
    try {
        const {
            is_active,
            light_id,
            device_id,
        } = req.body;
        await Device_Light.create({
            is_active,
            light_id,
            device_id,
        });
        return { status: true };
    } catch (error) {
        next(error);
    }
};

module.exports.updateDevice_Light = async(req, res, next) => {
    try{
        const {
            is_active,
            light_id,
            device_id,
        } = req.body;
        const dev = await Device_Light.findOneAndUpdate(
            {"device_id" : device_id},
            {"light_id" : light_id},
            {"is_active" : is_active}
        );
        return {message: "Success"};
    }catch (error){
        next(error);
    }
};

