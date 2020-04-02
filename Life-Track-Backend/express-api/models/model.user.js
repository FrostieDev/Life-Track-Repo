class UserModel {
    constructor(name, email, signedUpDate, password, activities) {
        this.name = name;
        this.email = email;
        this.signedUpDate = signedUpDate;
        this.password = password;
    }
}

module.exports = UserModel;