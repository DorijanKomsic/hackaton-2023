const { addThermostat } = require("../services/ThermostatService.js");
const { updateThermostat } = require("../services/ThermostatService.js");
const { getThermostat } = require("../services/ThermostatService.js");
const { deleteThermostat } = require("../services/Device_ThermostateService.js")

const router = require("express").Router();

router.post("/addThermostat", addThermostat);
router.put("/updateThermostat", updateThermostat);
router.get("/getThermostat", getThermostat);
router.delete("/deleteThermostat", deleteThermostat);

module.exports = router;