let UserSchema = require('../schemas/schema.user');
let mongoose = require('mongoose');
let conn = require('../connection');

async function insertActivityById(id, activityJson) {
    try {
        const res = await UserSchema.findByIdAndUpdate({
            _id: id
        }, {
            $push: {
                activities: {
                    name: activityJson.name,
                    category: activityJson.category,
                    percentage: activityJson.percentage,
                    deadline: activityJson.deadline,
                    concurrent: activityJson.concurrent,
                    done: activityJson.done,
                    description: activityJson.description,
                    creationDate: new Date()
                }
            }
        }, {
            new: true //Returns updated document
        });
        return res;
    } catch (err) {
        console.log(err);
    }
}

// Only works if all activities have same fields.
async function updateActivityById(id, aid, activityJson) {
    try {
        const res = await UserSchema.findOneAndUpdate({
            "_id": id,
            "activities._id": aid
        }, {
            "$set": {
                "activities.$": activityJson
            }
        });
        return res;
    } catch (err) {
        console.log(err);
    }
}


async function getActivityById(id, aid) {

    try {
        const res = await UserSchema.findOne({
            "activities._id": aid
        }, {
            "activities._id.$": aid
        });
        return res;
    } catch (err) {
        console.log(err);
    }
}

async function deleteActivityById(id, aid) {

    try {
        const res = await UserSchema.findOneAndDelete({
            "activities._id": aid
        }, {
            "activities._id.$": aid
        });
        return res;
    } catch (err) {
        console.log(err);
    }
}

//TODO:FIX
async function getSortedActivitiesById(id) {
    try {
        const res = await UserSchema.find({
            _id: id
        }).sort({

            'activities.creationDate': -1

        }).limit(2).exec();
        return res;
    } catch (err) {
        console.log(err);
    }
}

/* async function getActivitiesById(id, aid) {

    try {
        const res = await UserSchema.findOne({
            "activities._id": aid
        }, {
            "activities._id.$": aid
        });
        return res;
    } catch (err) {
        console.log(err);
    }
} */

module.exports = {
    updateActivityById,
    insertActivityById,
    getActivityById,
    deleteActivityById,
    getSortedActivitiesById

}