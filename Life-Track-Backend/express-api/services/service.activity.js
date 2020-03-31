var Validator = require('fastest-validator');
const ActivityModel = this.require("../models/model.activity");

let activities = {};
let counter = 0;

/* create an instance of the validator */
let activityValidator = new Validator();

/* customer validator shema */
const activityVSchema = {
    guid: {
        type: "string",
        min: 3
    }
};


class ActivityService {
    static create(data) {
        var vres = activityValidator.validate(data, activityVSchema);

        if (!(vres === true)) {
            let errors = {},
                item;

            for (const index in vres) {
                item = vres[index];

                errors[item.field] = item.message;
            }

            throw {
                name: "VaildationError",
                message: erros
            };
        }

        let activity = new ActivityModel(data.uid, data.name, data.category, data.percentage, data.deadline, data.concurrent, data.done, data.user, data.description);

        activity.uid = 'a' + counter++;

        activities[activity.uid] = activity;

        return activity;
    }


    static retrieve(uid) {
        if (activities[uid] != null) {
            return activities[uid];
        } else {
            throw new Error('Unable to retrieve a activity by (uid:' + uid + ')');
        }
    }

    static update(uid, data) {
        if (activities[uid] != null) {
            const activity = activities[uid];

            Object.assign(activity, data);
        } else {
            throw new Error('Unable to retrieve a activity by (uid:' + cuid + ')');
        }
    }

    static delete(uid) {
        if (activities[uid] != null) {
            delete activities[uid];
        } else {
            throw new Error('Unable to retrieve a activity by (uid:' + cuid + ')');
        }
    }

}
module.exports = ActivityService;