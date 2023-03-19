const { addLock } = require("../services/LockService.js");
const { updateLock } = require("../services/LockService.js");
const { getLock } = require("../services/LockService.js");
const { deleteLock } = require("../services/Device_LockService.js")

const router = require("express").Router();

router.post("/addLock", addLock);
router.put("/updateLock", updateLock);
router.get("/getLock", getLock);
router.delete("/deleteLock", deleteLock);

module.exports = router;