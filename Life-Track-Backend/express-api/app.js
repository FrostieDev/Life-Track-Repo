var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var cors = require('cors');

const routeUser = require('./routes/route-user');
const routerAuth = require('./routes/route-auth');
const routerQuote = require('./routes/route-quote');

var app = express();

app.use(cors());
app.use(cookieParser());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));


app.listen(3000, () => {
    console.log("Server running on port 3000");
});

app.use('/users', routeUser);

app.use('/auth', routerAuth);

app.use('/quote', routerQuote);

module.exports = app;