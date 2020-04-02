let UserSchema = require('../schemas/schema.user');
let conn = require('../connection');

/* let tempUserEntity = new UserSchema({
    name: "Finn",
    email: "finn@pind.dk",
    signedUpDate: "2020-05-18T16:00:00.000+00:00",
    password: "123",
    activities: {
        name: "Reading",
        category: "School",
        percentage: 60,
        deadline: new Date(),
        concurrent: "Daily",
        done: false,
        description: "Read chapter 2 Larman"
    }
});

let tempId = '5e85091b1c9d4400009206fc'; */

function insert(tempUserEntity) {

    let userEntity = new UserSchema({
        name: tempUserEntity.name,
        email: tempUserEntity.email,
        signedUpDate: tempUserEntity.signedUpDate,
        password: tempUserEntity.password
    });

    userEntity.save()
        .then(doc => {
            console.log(doc);
        })
        .catch(err => {
            console.log(err);
        });
}

async function getById(id) {
    try {
        const res = await UserSchema.find({
            _id: id
        });
        return res;
    } catch (err) {
        console.log(err);
    }
}


async function getAll() {
    try {
        const res = await UserSchema.find({
            __v: {
                $all: [0]
            }
        });
        return res;
    } catch (err) {
        console.error(err);
    }
}

async function updateById(id, json) {
    try {
        const res = await UserSchema.findByIdAndUpdate({
            _id: id
        }, {
            name: json.name,
            email: json.email,
            signedUpDate: json.signedUpDate,
            password: json.password
        }, {
            new: true //Returns updated document
        });
        return res;
    } catch (err) {
        console.log(err);
    }
}

async function removeById(id) {
    try {
        const res = await UserSchema.findByIdAndRemove({
            _id: id
        });
        return res;
    } catch (err) {
        console.log(err);
    }
}

module.exports = {
    getAll,
    getById,
    insert,
    updateById,
    removeById
}