class UserModel {
    constructor(name, signedUpDate, password) {
        this.name = name;
        this.signedUpDate = signedUpDate;
        this.password = password;
    }
}

module.exports = UserModel;