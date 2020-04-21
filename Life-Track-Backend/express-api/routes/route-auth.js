var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken');
var fs = require('fs');


var DBAuth = require('../../mongoDB/dbQueries/queries.auth');


//TODO: Use RSA encryption and implement in token.
//const RSA_PRIVATE_KEY = fs.readFileSync('../key/private.key');

router.post('/login', (req, res) => {
    const email = req.body.email,
        password = req.body.password;

    try {
        DBAuth.getUserAuth(email)
            .then((user) => {
                if (user[0].password == password) {
                    const expiration = 1000;
                    const secret = 'mysecret';
                    var tempUserID = user[0]._id.toString()
                    var tempName = user[0].name.toString()
                    // Make jwt token
                    const jwtBearerToken = jwt.sign({
                            name: tempName
                        },
                        secret, {
                            algorithm: "HS256",
                            expiresIn: expiration,
                            subject: tempUserID
                        });

                    // Respond to client.
                    res.setHeader('Cache-Control', 'private');
                    res.cookie("jwt", jwtBearerToken, {
                        httpOnly: true,
                        secure: false,
                        maxAge: expiration * 1000
                    });
                    res.status(200).json({
                        idToken: jwtBearerToken,
                        expiresIn: expiration,
                        name: tempName,
                        userId: tempUserID
                    });
                } else {
                    res.sendStatus(401);
                }

            });
    } catch (err) {
        res.status(500).json({
            message: err.message
        })
    }
});

router.post('/signup', (req, res) => {
    let incUser = req.body,
        password = req.body.password;
    try {
        DBAuth.insertUserAuth(incUser)
            .then((user) => {
                if (user[0].password ==
                    password) {
                    const expiration = 1000;
                    const secret = 'mysecret';
                    var tempUserID = user[0]._id.toString()
                    var tempName = user[0].name.toString()
                    // Make jwt token
                    const jwtBearerToken = jwt.sign({
                            name: tempName
                        },
                        secret, {
                            algorithm: "HS256",
                            expiresIn: expiration,
                            subject: tempUserID
                        });
                    // Respond to client.
                    res.setHeader('Cache-Control', 'private');
                    res.cookie("jwt", jwtBearerToken, {
                        httpOnly: true,
                        secure: false,
                        maxAge: expiration * 1000
                    });
                    res.status(200).json({
                        idToken: jwtBearerToken,
                        expiresIn: expiration,
                        name: tempName,
                        userId: tempUserID
                    });
                } else {
                    res.sendStatus(401);
                }

            });
    } catch (err) {
        res.status(500).json({
            message: err.message
        })
    }
});

module.exports = router;