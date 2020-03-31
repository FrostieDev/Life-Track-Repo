var express = require('express');
var router = express.Router();

var ActivityModel = require('../models/model.activity');


let activities = [{
    uid: "123",
    name: "Homework",
    category: "School",
    percentage: 100,
    deadline: "20/20/2020",
    concurrent: "Daily",
    done: false,
    user: null,
    description: "Read chapter 2 in Larman"
}];

router.get('/', (req, res) => {
    res.json(activities);
});

router.get('/:id', (req, res) => {
    // 
    const id = req.params.id;

    for (let activity of activities) {
        if (activity.id === id) {
            res.json(activity);
            return;
        }
    }

    // Sending 404 when not found something is a good practice
    res.status(404).send('Activity not found');

});


// Defined store route
router.route('/add').post(function(req, res) {
    let activity = Object.assign(new ActivityModel(), req.body);
    console.log(activity);
    activities.push(activity);

});

router.delete('/:id', (req, res) => {
    // 
    const id = req.params.id;

    // Remove activity from the activities array
    activities = activities.filter(i => {
        if (i.id !== id) {
            return true;
        }
        return false;
    });

    res.send('Activity is deleted');
});

module.exports = router;