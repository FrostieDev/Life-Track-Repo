var express = require('express');
var router = express.Router();
const https = require('https');

router.get('/get', (req, res) => {
    console.log("Getting quote");

    https.get('https://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=jsonp&jsonp=?', (resp) => {
        let data = '';

        // A chunk of data has been recieved.
        resp.on('data', (chunk) => {
            data += chunk;
        });

        // The whole response has been received. Print out the result.
        resp.on('end', () => {
            res.send(formatJson(data));
        });

    }).on("error", (err) => {
        console.log("Error: " + err.message);
    });
});

function formatJson(data) {
    //TODO: Find a fix for syntaxerror with \'
    //Incoming JSON is badly formatted, so need a hacky way to cope. Using ?, ()
    let oldObject = JSON.parse(data.replace("?", "").replace("(", "").replace(")", "").replace("\'", "").replace("\\"));
    let newObject = {
        quote: oldObject.quoteText,
        author: oldObject.quoteAuthor,
        link: oldObject.quoteLink
    };

    return JSON.stringify(newObject); //Sends JSON back
}

module.exports = router;