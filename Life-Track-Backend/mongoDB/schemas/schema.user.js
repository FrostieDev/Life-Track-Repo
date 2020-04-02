let mongoose = require('mongoose');
// TODO: Add validator
let userSchema = {
    name: String,
    email: String,
    signedUpDate: Date,
    password: String,
    activities: [{
        name: String,
        category: String,
        percentage: Number,
        deadline: Date,
        concurrent: String,
        done: Boolean,
        description: String
    }]
}

module.exports = mongoose.model('User', userSchema, 'User');