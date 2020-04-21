let UserSchema = require('../schemas/schema.user');
let conn = require('../connection');

/**
 * Inserts user into mongoDB.
 * 
 * @param {JSON} tempUserEntity 
 * @returns JSON document
 */
async function insert(tempUserEntity) {

    let userEntity = new UserSchema({
        name: tempUserEntity.name,
        email: tempUserEntity.email,
        signedUpDate: new Date(),
        password: tempUserEntity.password
    });

    try {
        userEntity.save()
            .then(doc => {
                return doc;
            })
            .catch(err => {
                console.log(err);
            });
    } catch (err) {
        console.log(err);
    }
}

/**
 * Gets a user from mongoDB.
 * 
 * @param {string} id
 * @returns JSON document
 */
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

/**
 * Gets all users from mongoDB.
 * 
 * @returns JSON document
 */
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

/**
 * Updates a user from mongoDB.
 * 
 * @param {string} id
 * @param {JSON} json A complete JSON file of a user.
 * @returns JSON document
 */
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

/**
 * Removes a user from mongoDB.
 * 
 * @param {string} id
 * @returns JSON document
 */
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