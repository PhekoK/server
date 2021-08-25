var mongoose = require('mongoose');

var userSchema = mongoose.Schema({
    firstName: String,
    lastName: String,
    dob: String,
    phoneNumber: String,
    email: {type: String, unique: true },
    password: String,
    confirmPassword: String

}, { versionKey: false });

module.exports = mongoose.model('User', userSchema);