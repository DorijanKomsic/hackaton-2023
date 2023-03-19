const mongoose = require('mongoose');
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');

const Schema = mongoose.Schema;

const ProfilesSchema = new Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Users',
        required: [true, 'User ID can\'t be empty'],
    },
    name: {
        type: String,
        required: [true, 'Name can\'t be empty'],
        minlength: 3,
        maxlength: 25,
        trim: true
    },
    password: {
        type: String,
        required: [true, 'Password can\'t be empty'],
        minlength: 6,
        select: false
    },
    admin: {
        type: String,
        required: [true, 'Role must be selected'],
        select: true
    }
});

ProfilesSchema.pre('save', async function () {
    const salt = await bcryptjs.genSalt(10);
    this.password = await bcryptjs.hash(this.password, salt);
    this.createdAt = new Date().toISOString();
});

ProfilesSchema.methods.createJWT = function () {
    return jwt.sign({ 'profileId': this._id, 'user_id': this.user_id, 'profileName': this.name, 'admin': this.admin }, process.env.JWT_SECRET);
}

ProfilesSchema.methods.comparePassword = async function (pass) {
    return await bcryptjs.compare(pass, this.password);
}


module.exports = mongoose.model("Profile", ProfilesSchema);