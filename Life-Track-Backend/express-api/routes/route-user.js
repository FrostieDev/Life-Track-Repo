var express = require('express');
var router = express.Router();
const expressJwt = require('express-jwt');

var DBUser = require('../../mongoDB/dbQueries/queries.user');
var DBActivity = require('../../mongoDB/dbQueries/queries.activity');

const checkIfAuthenticated = expressJwt({
    secret: 'mysecret'
});

router.get('/', (req, res) => {
    try {
        DBUser.getAll()
            .then((users) => {
                res.json(users);
            });
    } catch (err) {
        res.status(500).json({
            message: err.message
        })
    }
});

router.get('/:id', checkIfAuthenticated, (req, res) => {
    // 
    const id = req.params.id;
    console.log(id);
    console.log(checkIfAuthenticated);
    console.log(req.headers);

    try {
        DBUser.getById(id)
            .then((user) => {
                res.json(user);
            })
    } catch (err) {
        res.status(500).json({
            message: err.message
        })
    }
});

// Defined store route
router.route('/add').post(function(req, res) {
    let user = req.body;

    try {
        DBUser.insert(user)
            .then((user) => {
                res.json(user);
            });
    } catch (err) {
        res.status(500).json({
            message: err.message
        })
    }
});

router.route('/:id/update').put(function(req, res) {
    DBUser.updateById(req.params.id, req.body)
        .then((user) => {
            res.json(user);
        })
});

router.route('/:id/delete').delete((req, res) => {
    const id = req.params.id;

    DBUser.removeById(id);

    res.send('User is deleted');
});

router.route('/:id/activities/add').put(function(req, res) {
    try {
        DBActivity.insertActivityById(req.params.id, req.body)
            .then((doc) => {
                res.send(doc);
                console.log(doc);
            });
    } catch (err) {
        res.status(500).json({
            message: err.message
        })
    }
});



router.route('/:id/activities/:aid/update').put(function(req, res) {
    try {
        DBActivity.updateActivityById(req.params.id, req.params.aid, req.body)
            .then((doc) => res.send(doc));
    } catch (err) {
        res.status(500).json({
            message: err.message
        })
    }
});

/* router.get('/:id/activities', (req, res) => {
    // 
    const id = req.params.id;

    try {
        DBActivity.getActivitiesById(id)
            .then((user) => {
                res.json(user);
            })
    } catch (err) {
        res.status(500).json({
            message: err.message
        })
    }
}); */

router.get('/:id/activities/:aid', (req, res) => {
    // 
    const id = req.params.id;
    const aid = req.params.aid;

    try {
        DBActivity.getActivityById(id, aid)
            .then((user) => {
                res.json(user);
            })
    } catch (err) {
        res.status(500).json({
            message: err.message
        })
    }
});

router.route('/:id/activities/:aid/delete').put(function(req, res) {
    const id = req.params.id;
    const aid = req.params.aid;

    try {
        DBActivity.deleteActivityById(id, aid)
            .then((user) => {
                res.json(user);
            })
    } catch (err) {
        res.status(500).json({
            message: err.message
        })
    }
});

//TODO: FIX
router.get('/:id/activities', (req, res) => {
    try {
        DBActivity.getSortedActivitiesById(req.params.id)
            .then((activities) => {
                res.json(activities);
            })
    } catch (err) {
        res.status(500).json({
            message: err.message
        })
    }
});

module.exports = router;