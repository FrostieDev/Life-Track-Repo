class ActivityModel {
    constructor(uid, name, category, percentage, deadline, concurrent, done, user, description) {
        this.uid = uid;
        this.name = name;
        this.category = category;
        this.percentage = percentage;
        this.deadline = deadline;
        this.concurrent = concurrent;
        this.done = done;
        this.user = user;
        this.description = description;
    }
}

module.exports = ActivityModel;