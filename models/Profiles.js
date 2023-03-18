const mongoose = require('mongoose');
const bcryptjs = require('bcryptjs');

const Schema = mongoose.Schema;

const ProfilesSchema = new Schema({
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
    }
});

UserSchema.pre('save', async function () {
    const salt = await bcryptjs.genSalt(10);
    this.password = await bcryptjs.hash(this.password, salt);
    this.createdAt = new Date().toISOString();
});


UserSchema.methods.comparePassword = async function (pass) {
    return await bcryptjs.compare(pass, this.password);
}

module.exports = mongoose.model("Profile", ProfilesSchema);