let UserAuthSchema = require('../schemas/schema.userAuth');
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


module.exports = {
    getUserAuth
}