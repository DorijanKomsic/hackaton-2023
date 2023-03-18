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

async function login(loginInfo) {
    if (!loginInfo.email || !loginInfo.password) {
        throw new StatusError('All credentials have to be provided', 422);
    }
    const loginUser = await Users.findOne({
        email: loginInfo.email
    }).select('+password');
    if (!loginUser) {
        throw new StatusError('No such user found', 404);
    }
    else {
        // bcrypt compare
        const passwordMatches = await loginUser.comparePassword(loginInfo.password);
        if (!passwordMatches) {
            throw new StatusError('Incorrect password', 401);
        }
        loginUser.password = undefined;
        delete (loginUser.password);
        const token = loginUser.createJWT();
        return { loginUser, token };
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