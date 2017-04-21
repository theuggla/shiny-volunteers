/**
 * Router for the volunteer handling pages.
 */

// Requires.
let router = require('express').Router();
let volunteers = require('../lib/volunteerHandling');
let checkIfAuthorized = require('../middleware/middleware').checkIfAuthorized;

// Routes---------------------------------------------------------------------------------------------------------------

router.use((req, res, next) => {
    console.log('just want to check the req');
    console.log(req.body);
    console.log(req.headers);
    next();
});

router.use(checkIfAuthorized);

router.post('/profile', (req, res, next) => {
        console.log('made it to server post');
        console.log('checking if the user made it through');
        let user = req.user;
        user.profile = req.body;
        user.save()
            .then((result) => {
            console.log('saved');
            });

    });

router.get('/profile', (req, res, next) => {
    console.log('made it to server get');
    console.log('sending json back');
    console.log(req.user.profile);
    res.json({profile: req.user.profile});
});


// Exports-------------------------------------------------------------------------------------------------------------
module.exports = router;
