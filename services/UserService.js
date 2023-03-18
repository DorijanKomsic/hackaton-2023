//express service = php dao
const bcryptjs = require('bcrypt');


const Users = require('../models/Users.js');
//const { StatusError } = require('../utils/helper.util');

async function register(req, res, next) {
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
    res.status(201).send({ registeredUser, token });
    //return { registeredUser, token };
}

async function login(req, res, next) {
    const loginInfo = req.body;
    console.log(loginInfo.email)
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
            const token = loginUser.createJWT();
            loginUser.password = undefined;
            delete loginUser.password;
            res.status(200).json({
            token,
            user: loginUser
        });
    }
}


// admin
async function getNewUsersCount() {
    const date = new Date();
    const fromDate = date.setDate(date.getDate() - 7);
    userCount = await Users.countDocuments({ 'createdAt': { $gte: fromDate } });
    return ({ 'newUsers': userCount });
}

module.exports = {
    register: register,
    login: login,
    getNewUsersCount
};