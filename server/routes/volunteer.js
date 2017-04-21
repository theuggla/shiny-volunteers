/**
 * Router for the volunteer handling pages.
 */

// Requires.
let router = require('express').Router();
let checkIfAuthorized = require('../middleware/middleware').checkIfAuthorized;
let Need = require('../models/Need');

// Routes---------------------------------------------------------------------------------------------------------------
router.use(checkIfAuthorized);

router.route('/profile')
    .get((req, res, next) => {
        res.json({profile: req.user.profile});
    })
    .post((req, res, next) => {
        let user = req.user;
        console.log(req.body);
        user.profile = req.body;
        user.save()
            .then(() => {
                res.redirect('/volunteer/profile');
            });
    });

router.route('/match')
    .get((req, res, next) => {
        let user = req.user;
        Need
            .find({
                skills: {$in: user.profile.skills}
            })
            .limit(10)
            .sort({ occupation: -1 })
            .select({
                skills          : 1,
                title           : 1,
                description     : 1,
                shortDesc       : 1,
                expiryDate      : 1
            })
            .then((result) => {
                res.json({needs: result});
            });
    });




// Exports-------------------------------------------------------------------------------------------------------------
module.exports = router;
