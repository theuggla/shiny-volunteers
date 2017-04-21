/**
 * Router for the organization handling pages.
 */

// Requires.
let router = require('express').Router();
let checkIfAuthorized = require('../middleware/middleware').checkIfAuthorized;
let Need = require('../models/Need');

// Routes---------------------------------------------------------------------------------------------------------------
router.use(checkIfAuthorized);

router.post('/needs/add', (req, res, next) => {
    let user = req.user;
    console.log('made it to the add need');
    console.log('with');
    console.log(req.body);
    console.log('for user');
    console.log(user);

    let need = new Need({
        _creator : user._id,
        skills   : req.body.skills
    });

    need.save()
        .then((savedNeed) => {
        console.log('need saved');
            user.needs.push(savedNeed._id);
            return user.save();
        })
        .then((user) => {
        console.log('need saved as user reference');
            res.redirect('/organization/needs/add');
        })
        .catch((error) => {
        console.log('got error ' + error);
            return res.json({error: 'Error saving the need'});
        });
});

router.get('/needs/add', (req, res, next) => {
    res.json({success: true, message: 'hurray'});
});


// Exports-------------------------------------------------------------------------------------------------------------
module.exports = router;
