var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var cors = require('cors');

const routeUser = require('./routes/route-user');
const routeActivity = require('./routes/route-activity');
var ActivityModel = require('./models/model.activity');

var app = express();

let activities = [{
    uid: "123",
    name: "Homework",
    category: "School",
    percentage: 100,
    deadline: "20/20/2020",
    concurrent: "Daily",
    done: true,
    user: null,
    description: "Read chapter 2 in Larman"
}];

app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));


app.listen(3000, () => {
    console.log("Server running on port 3000");
});

app.use('/activity', routeActivity);
app.use('/users', routeUser);

module.exports = app;