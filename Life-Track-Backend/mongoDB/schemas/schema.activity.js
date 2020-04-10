let mongoose = require('mongoose');

let activitySchema = {
    name: String,
    category: String,
    percentage: Number,
    deadline: Date,
    recurrent: String,
    done: Boolean,
    description: String,
    creationDate: Date
};

module.exports = mongoose.model('Activity', activitySchema);