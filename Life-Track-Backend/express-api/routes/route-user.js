var express = require('express');
var router = express.Router();

var DBUser = require('../../mongoDB/dbQueries/queries.user');
var DBActivity = require('../../mongoDB/dbQueries/queries.activity');
var UserModel = require('../models/model.user');

/* let activities = [{
    uid: "123",
    name: "Homework",
    category: "School",
    percentage: 100,
    deadline: "20/20/2020",
    concurrent: "Daily",
    done: false,
    user: null,
    description: "Read chapter 2 in Larman"
}]; */

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

router.get('/:id', (req, res) => {
    // 
    const id = req.params.id;

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

    // Sending 404 when not found something is a good practice
    //res.status(404).send('User not found');

});


// Defined store route
router.route('/add').post(function(req, res) {
    //let user = Object.assign(new UserModel(), req.body);
    let user = req.body;
    console.log('Route log + ');
    console.log(user);
    DBUser.insert(user);
});

// 
router.route('/:id/update').put(function(req, res) {
    DBUser.updateById(req.params.id, req.body);
});

router.route('/:id/delete').delete((req, res) => {
    // 
    const id = req.params.id;

    DBUser.removeById(id);

    res.send('User is deleted');
});

router.route('/:id/activities/add').put(function(req, res) {
    try {
        DBActivity.insertActivityById(req.params.id, req.body);
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
    // Sending 404 when not found something is a good practice
    //res.status(404).send('User not found');
});

router.get('/:id/activities/:aid/delete', (req, res) => {
    // 
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

    // Sending 404 when not found something is a good practice
    //res.status(404).send('User not found');

});

module.exports = router;