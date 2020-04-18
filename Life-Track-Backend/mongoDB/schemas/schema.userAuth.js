let mongoose = require('mongoose');

// TODO: Add validator
let userAuthSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String
});

module.exports = mongoose.model('UserAuth', userAuthSchema, 'User');