const { profileRegister } = require("../services/ProfileService");
const { profileLogin } = require("../services/ProfileService");
const { listProfiles } = require("../services/ProfileService");

const router = require("express").Router();

router.post("/profileRegister", profileRegister);
router.post("/profileLogin", profileLogin);
router.get("/list-profiles", listProfiles);

module.exports = router;