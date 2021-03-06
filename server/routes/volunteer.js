/**
 * Router for the volunteer handling pages.
 */

// Requires.
let router = require('express').Router();
let checkIfAuthorized = require('../middleware/middleware').checkIfAuthorized;
let Need = require('../models/Need');
let Organization = require('../models/Organization');
let mailer = require('../lib/emailresource');
let volunteers = require('../lib/volunteerhandlingresource');

// Routes---------------------------------------------------------------------------------------------------------------
router.use(checkIfAuthorized);

router.route('/profile')
    .get((req, res, next) => {
        res.json({profile: req.user.profile});
    })
    .post((req, res, next) => {
        let user = req.user;
        let profile = req.body;
        volunteers.updateProfile(user, profile)
            .then(() => {
                res.redirect('/volunteer/profile');
            })
            .catch((error) =>{
                return next(error);
            });
    });

router.route('/match')
    .get((req, res, next) => {
        let user = req.user;
        volunteers.getMatches(user)
            .then((matches) => {
                res.json({needs: matches});
            })
            .catch((error) =>{
                return next(error);
            });
    });

router.route('/applications')
    .get((req, res, next) => {
        let user = req.user;

        volunteers.getApplications(user)
            .then((result) => {
                res.json({applications: result});
            })
            .catch((error) => {
                return next(error);
            });
    })
    .post((req, res) => {
        let user = req.user;
        let creator;
        let need;

        Need.findById(req.body.id)
            .then((result) => {
                need = result;

                return volunteers.updateApplications(user, need);
            })
            .then(() => {
                Organization.findById(need._creator)
                    .then((org) => {
                        creator = org;
                        return Promise.all([mailer.sendMailToUser(user, need), mailer.sendApplicationMail(creator, need, user)]);
                    });
            })
            .then(() => {
                res.redirect('/volunteer/applications');
            })
            .catch((error) => {
                res.json({message: 'something seems to have gone wrong with your application. please try again later.'});
            });
    });

// Exports-------------------------------------------------------------------------------------------------------------
module.exports = router;
