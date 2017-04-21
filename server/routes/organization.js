/**
 * Router for the organization handling pages.
 */

// Requires.
let router = require('express').Router();
let checkIfAuthorized = require('../middleware/middleware').checkIfAuthorized;
let Need = require('../models/Need');

// Routes---------------------------------------------------------------------------------------------------------------
router.use(checkIfAuthorized);

router.route('/needs')
    .get((req, res, next) => {
        let user = req.user;
            Need
            .find({_creator: user._id})
                .then((result) => {
                    let mappedResult = result.map((need) => {
                        return {
                            _id             : need._id,
                            skills          : need.skills,
                            title           : need.title,
                            description     : need.description,
                            shortDesc       : need.shortDesc,
                            expiryDate      : need.expiryDate.toLocaleDateString()
                        };
                    });

                    res.json({needs: mappedResult});
                });
    })
    .post((req, res, next) => {
        let user = req.user;
        let dotIndex = req.body.description.indexOf('.');
        let cutOfDesc = (dotIndex < 100 && dotIndex > 20) ? dotIndex : 80;
        let need = new Need({
            _creator        : user._id,
            skills          : req.body.skills,
            title           : req.body.title,
            description     : req.body.description,
            shortDesc       : req.body.description.slice(0, cutOfDesc) + ' (...)'
        });

        need.save()
            .then((savedNeed) => {
                user.needs.push(savedNeed._id);
                return user.save();
            })
            .then((user) => {
                res.redirect('/organization/needs');
            })
            .catch((error) => {
                return res.json({error: 'Error saving the need'});
            });
    });

router.route('/needs/:id')
    .get((req, res, next) => {
        res.json({success: true, message: 'here be specific need'});
    });

// Exports-------------------------------------------------------------------------------------------------------------
module.exports = router;
