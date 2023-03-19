const { profileRegister } = require("../services/ProfileService");
const { profileLogin } = require("../services/ProfileService");

const router = require("express").Router();

router.post("/profileRegister", profileRegister);
router.post("/profileLogin", profileLogin);

module.exports = router;