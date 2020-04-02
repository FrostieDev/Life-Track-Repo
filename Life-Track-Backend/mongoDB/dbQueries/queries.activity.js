let ActivitySchema = require('../schemas/schema.activity');
let UserSchema = require('../schemas/schema.user');
let conn = require('../connection');

tempUserEntity = new UserSchema({
    name: "Jens",
    email: "jens@pind.dk",
    signedUpDate: '2020-05-18T16:00:00.000+00:00',
    password: "123"
});

tempActivityEntity = new ActivitySchema({
    name: "Homework",
    category: "School",
    percentage: 75,
    deadline: new Date(),
    concurrent: "Daily",
    done: "false",
    user: tempUserEntity._id,
    description: "Read chapter 13 Operating Systems"
});

tempId = '5e8514584ca2ea41389e5a80';