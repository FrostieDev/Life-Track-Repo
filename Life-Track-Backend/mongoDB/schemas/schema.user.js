let mongoose = require('mongoose');
// TODO: Add validator
let userSchema = {
    name: String,
    email: String,
    signedUpDate: Date,
    password: String
}

module.exports = mongoose.model('User', userSchema, 'User');