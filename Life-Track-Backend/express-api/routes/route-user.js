var express = require('express');
var router = express.Router();

var DBUser = require('../../mongoDB/dbQueries/queries.user');
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

module.exports = router;