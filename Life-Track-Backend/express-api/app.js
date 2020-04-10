var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var cors = require('cors');

const routeUser = require('./routes/route-user');

var app = express();

app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));


app.listen(3000, () => {
    console.log("Server running on port 3000");
});

app.use('/users', routeUser);

module.exports = app;