let mongoose = require('mongoose');

let activitySchema = {
    name: String,
    category: String,
    percentage: Number,
    deadline: Date,
    concurrent: String,
    done: Boolean,
    description: String
};

module.exports = mongoose.model('Activity', activitySchema);