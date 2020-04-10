const {
    MongoClient
} = require('mongodb');
var connectionString = require("./config.json");
let mongoose = require('mongoose');

class Database {
    constructor() {
        this._connect();
    }

    _connect() {
        mongoose.connect(connectionString.Connection.uri, {
                useNewUrlParser: true
            })
            .then(() => {
                console.log('Database connection succesful')
            })
            .catch(err => {
                console.error('Database connection eroor')
            })
    }

    _disconnect() {
        mongoose.disconnect()
            .then(() =>
                console.log('Disconnect succesful'))
            .catch(err => {
                console.log(err)
            })
    }


}


module.exports = new Database();