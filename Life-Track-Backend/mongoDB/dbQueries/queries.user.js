let UserSchema = require('../schemas/schema.user');
let conn = require('../connection');

let tempUserEntity = new UserSchema({
    name: "Jens",
    email: "jens@pind.dk",
    signedUpDate: "2020-05-18T16:00:00.000+00:00",
    password: "123"
})

let tempId = '5e85091b1c9d4400009206fc';

function insert(userEntity) {
    userEntity.save()
        .then(doc => {
            console.log(doc);
        })
        .catch(err => {
            console.log(err);
        });
}

function getById(id) {
    UserSchema.find({
            _id: id
        })
        .then(doc => {
            console.log(doc);
        })
        .catch(err => {
            console.error(err);
        })
}

getById(tempId);

function updateNameByid(id) {
    UserSchema.findOneAndUpdate({
            _id: id
        }, {
            name: 'Jens Hal'
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
    UserSchema.findOneAndRemove({
            _id: id
        })
        .then(response => {
            console.log(response)
        })
        .then(err => {
            console.log(err)
        })
}