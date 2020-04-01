let mongoose = require('mongoose');

let activitySchema = new mongoose.Schema({
    name: String,
    category: String,
    percentage: Number,
    deadline: Date,
    concurrent: String,
    done: Boolean,
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    description: String
});

module.exports = mongoose.model('Activity', activitySchema, 'Activity')