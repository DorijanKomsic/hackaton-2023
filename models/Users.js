const mongoose = require('mongoose');
const validator = require('validator');
const bcryptjs = require('bcryptjs');
const generalConfig = require('');

const UserSchema = new mongoose.Schema({
    first_name: {
        type: String,
        required: [true, 'Name can\'t be empty'],
        minlength: 3,
        maxlength: 25,
        trim: true
    },
    last_name: {
        type: String,
        required: [true, 'Lastname can\'t be empty'],
        minlength: 4,
        maxlength: 30,
        trim: true
    },
    email: {
        type: String,
        required: true,
        validate: {
            validator: validator.isEmail,
            message: 'Valid email required'
        },
        unique: true // creates an index in the db
    },
    password: {
        type: String,
        required: [true, 'Password can\'t be empty'],
        minlength: 6,
        select: false
    },
    createdAt: {
        type: Date,
        unique: true
    }
});

UserSchema.pre('save', async function () {
    const salt = await bcryptjs.genSalt(10);
    this.password = await bcryptjs.hash(this.password, salt);
    this.createdAt = new Date().toISOString();
});

module.exports.register = async (req,res, next) => {
    try {
        const { email, password } = req.body;
        const emailCheck = await Users.findOne({ email });
        if (emailCheck)
            return res.json({ msg: "Email Already Exists", status: false });
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await User.create({
            first_name,
            last_name,
            email,
            password: hashedPassword,
        });
        delete user.password;
        return res.json({ status: true, user });
    } catch (error) {
        next(error);
    }
};

module.exports.login = async (req,res, next) => {
    try {
        const { email, password } = req.body;
        const emailCheck = await Users.findOne({ email });
        if (!emailCheck)
            return res.json({ msg: "User Doesnt Exist", status: false });
        const passValid = await bcrypt.compare(password, emailCheck.password);
        if (!passValid)
            return res.json({ msg: "Wrong Pasword", status: false });
        delete emailCheck.password;
        return res.json({ status: true, emailCheck });
    } catch (error) {
        next(error);
    }
};


UserSchema.methods.comparePassword = async function (pass) {
    return await bcryptjs.compare(pass, this.password);
}

module.exports = mongoose.model("Users", UserSchema);