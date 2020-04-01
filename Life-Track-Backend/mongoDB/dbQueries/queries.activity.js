let ActivitySchema = require('../schemas/schema.activity');
let UserSchema = require('../schemas/schema.user');
let conn = require('../connection');

let tempUserEntity = new UserSchema({
    email: "jens@pind.dk"
});

let tempActivityEntity = new ActivitySchema({
    name: "Homework",
    category: "School",
    percentage: 75,
    deadline: new Date(),
    concurrent: "Daily",
    done: "false",
    user: tempUserEntity._id,
    description: "Read chapter 13 Operating Systems"
})

let tempId = '5e8514584ca2ea41389e5a80';

function insert(activityEntity) {
    activityEntity.save()
        .then(doc => {
            console.log(doc);
        })
        .catch(err => {
            console.log(err);
        });
}

function getById(id) {
    ActivitySchema.find({
            _id: id
        })
        .then(doc => {
            console.log(doc);
        })
        .catch(err => {
            console.error(err);
        })
}

function updateNameByid(id) {
    ActivitySchema.findOneAndUpdate({
            _id: id
        }, {
            name: 'Boring homework'
        }, {
            new: true //Returns updated document
        })
        .then(doc => {
            console.log(doc)
        })
        .then(err => {
            console.log(err)
        })
}

function removeById(id) {
    ActivitySchema.findOneAndRemove({
            _id: id
        })
        .then(response => {
            console.log(response)
        })
        .then(err => {
            console.log(err)
        })
}