const { addThermostat } = require("../services/ThermostatService.js");
const { updateThermostat } = require("../services/ThermostatService.js");
const { getThermostat } = require("../services/ThermostatService.js");
const { deleteThermostat } = require("../services/Device_ThermostateService.js")

const router = require("express").Router();

router.post("/addThermostat", (req, res) =>addThermostat);
router.put("/updateThermostat", (req, res) => updateThermostat);
router.get("/getThermostat", getThermostat);
router.delete("/deleteThermostat", (req, res) => deleteThermostat);

module.exports = router;