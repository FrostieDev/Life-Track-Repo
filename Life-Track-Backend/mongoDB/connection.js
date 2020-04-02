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




// async function main() {
//     /**
//      * Connection URI. Update <username>, <password>, and <your-cluster-url> to reflect your cluster.
//      * See https://docs.mongodb.com/ecosystem/drivers/node/ for more details
//      */

//     const client = new MongoClient(connectionString.Connection.uri);

//     try {
//         // Connect to the MongoDB cluster
//         await client.connect();

//         // Make the appropriate DB calls
//         await listDatabases(client)
//             .then(
//                 createListing(client, tempActivity)
//             );

//     } catch (e) {
//         console.error(e);
//     } finally {
//         await client.close();
//     }
// }

// main().catch(console.error);

// async function listDatabases(client) {
//     databasesList = await client.db().admin().listDatabases();

//     console.log("Databases:");
//     databasesList.databases.forEach(db => console.log(` - ${db.name}`));
// };

// var tempActivity = {
//     "uid": "123",
//     "name": "Homework",
//     "category": "School",
//     "percentage": 75,
//     "deadline": "20/20/2020",
//     "concurrent": "Daily",
//     "done": "false",
//     "user": "Bob",
//     "description": "Read chapter 13 Operating Systems"
// }


// async function createListing(client, activity) {
//     const result = await client.db("LifeTrack").collection("Activity").insertOne(activity);
//     console.log(`New listing created with the following id: ${result.insertedId}`);
// }