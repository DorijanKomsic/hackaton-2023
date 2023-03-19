//express service = php dao
const bcryptjs = require('bcrypt');
const Profiles = require('../models/Profiles.js');


const Users = require('../models/Users.js');
const ProfileService = require('./ProfileService.js');

async function register(req, res, next) {
    try {
        console.log(req.body);
        //    console.log(user.body);
        let registeredUser = await Users.create({
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            email: req.body.email,
            password: req.body.password
        });
        registeredUser.password = undefined;
        delete (registeredUser.password);

        const token = registeredUser.createJWT();
        console.log(token);
        console.log("\n", registeredUser)

        try {
            await ProfileService.profileRegisterSolo(registeredUser._id);
            res.status(201).send({ registeredUser, token });
        }
        catch (e) {
            console.log(e);
            await Profiles.deleteOne({ '_id': registeredUser._id })
            res.status(500);
            res.end("Error creating profile");
        }
    }
    catch (e) {
        console.log(e);
        res.status(500);
        res.end("Error creating user");
    }
    //return { registeredUser, token };
}

async function login(req, res, next) {
    const loginInfo = req.body;
    if (!req.body.email || !req.body.password) {
        res.status(401);
        return res.end("Bad request")
    }
    const loginUser = await Users.findOne({
        email: loginInfo.email
    }).select('+password');
    if (!loginUser) {
        res.status(404);
        return res.end("Not found")
    }
    else {
        // bcrypt compare
        const passwordMatches = await loginUser.comparePassword(loginInfo.password);
        if (!passwordMatches) {
            console.log("Incorrect password");
            res.status(401);
            return res.end('Incorrect password');
        }
        loginUser.password = undefined;
        delete (loginUser.password);
        const token = loginUser.createJWT();
        res.status(201).end({ loginUser, token });
    }
}

module.exports = {
    register: register,
    login: login,
};