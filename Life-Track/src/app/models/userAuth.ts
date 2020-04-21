export class UserAuth {
    name: string;
    email: string;
    signedUpDate: Date;
    password: string;

    constructor(name, email, signedUpDate, password) {
        this.name = name;
        this.email = email;
        this.signedUpDate = signedUpDate;
        this.password = password;
    }
}