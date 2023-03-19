const { addThermostat } = require('../services/ThermostatService');

const router = require('express').Router();


router.post("/add-thermostat-device", addThermostat);

module.exports = router;