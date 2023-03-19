const { addLight } = require("../services/LightService.js");
const { updateLight } = require("../services/LightService.js");
const { getLight } = require("../services/LightService.js");
const { deleteLight } = require("../services/Device_LightService.js")

const router = require("express").Router();

router.post("/addLight", addLight);
router.put("/updateLight", updateLight);
router.get("/getLight", getLight);
router.delete("/deleteLight", deleteLight);

module.exports = router;