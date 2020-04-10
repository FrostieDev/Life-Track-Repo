let mongoose = require('mongoose');
let ActivitySchema = require('../schemas/schema.activity');

// TODO: Add validator
let userSchema = new mongoose.Schema({
    name: String,
    email: String,
    signedUpDate: Date,
    password: String,
    activities: [ActivitySchema.schema]
});

module.exports = mongoose.model('User', userSchema, 'User');