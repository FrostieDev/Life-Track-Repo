let UserAuthSchema = require('../schemas/schema.userAuth');
let UserSchema = require('../schemas/schema.user');
let conn = require('../connection');

/**
 * Gets a user from mongoDB.
 * 
 * @param {string} email
 * @returns JSON document
 */
async function getUserAuth(email) {
    try {
        const res = await UserAuthSchema.find({
            email: email
        });
        return res;
    } catch (err) {
        console.log(err);
    }
}

async function insertUserAuth(tempUserEntity) {

    let userEntity = new UserSchema({
        name: tempUserEntity.name,
        email: tempUserEntity.email,
        signedUpDate: new Date(),
        password: tempUserEntity.password
    });
    console.log("Starting insert");

    return new Promise((resolve, reject) => {
        userEntity.save()
            .then(() => {
                console.log(tempUserEntity);
                resolve(getUserAuth(tempUserEntity.email));
            })
            .catch(err => {
                reject(err);
                console.log(err);
            });
    });
}


module.exports = {
    getUserAuth,
    insertUserAuth
}