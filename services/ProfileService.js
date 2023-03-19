const bcryptjs = require('bcrypt');
var passwordGenerator = require('generate-password');

const Profiles = require('../models/Profiles.js');

async function profileRegister(req, res, next) {
    //console.log(":M:M:M:M", req.body, req.user_id);
    //    console.log(user.body);
    let registeredProfile = await Profiles.create({
        user_id: req.user_id,
        name: req.body.name,
        password: req.body.password,
        admin: req.body.admin
    });
    registeredProfile.password = undefined;
    delete (registeredProfile.password);

    const profileToken = registeredProfile.createJWT();
    console.log(profileToken);
    console.log("\n", registeredProfile)
    res.status(201).end({ registeredProfile, profileToken });
    //return { registeredUser, token };
}

async function listProfiles(req, res, next) {
    try {
        const profiles = await Profiles.find({}).populate('_id', 'name')
    } catch(error) {
        next(error);
    }
}

async function profileRegisterSolo(user_id) {
    //console.log(req.body);
    console.log("26", user_id);
    let password = passwordGenerator.generate({
        length: 10,
        numbers: true
    });
    let registeredProfile = await Profiles.create({
        user_id: user_id,
        name: "Admin",
        password: password,
        admin: true
    });

    console.log("\n", registeredProfile)
    return registeredProfile;
}
//return 

async function profileLogin(req, res, next) {
    const loginInfo = req.body;
    console.log(loginInfo);
    if (!loginInfo.password) {
        res.status(401);
        return res.end("Bad request")
    }
    const loginProfile = await Profiles.findOne({
        _id: loginInfo._id
    }).select('+password');
    if (!loginProfile) {
        res.status(404);
        return res.end("Not found")
    }
    else {
        // bcrypt compare
        const passwordMatches = await loginProfile.comparePassword(loginInfo.password);
        if (!passwordMatches) {
            console.log("Incorrect password");
            res.status(401);
            return res.end('Incorrect password');
        }
        loginProfile.password = undefined;
        delete (loginProfile.password);
        const profileToken = loginProfile.createJWT();
        res.status(200).end({ loginProfile, profileToken });
    }
}

async function compareAdminPassword(loginInfo) {
    const passwordMatches = await loginUser.comparePassword(loginInfo.adminPassword);
    if (!passwordMatches) {
        throw new StatusError('Incorrect password', 401);
    }
    return true;
}

module.exports = {
    profileRegister: profileRegister,
    profileLogin: profileLogin,
    listProfiles: listProfiles,
    //compareAdminPassword: compareAdminPassword,
    profileRegisterSolo: profileRegisterSolo
};