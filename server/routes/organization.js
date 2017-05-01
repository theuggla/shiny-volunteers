/**
 * Router for the organization handling pages.
 */

// Requires.
let router = require('express').Router();
let checkIfAuthorized = require('../middleware/middleware').checkIfAuthorized;
let Need = require('../models/Need');
let organization = require('../lib/organizationhandlingresource');

// Routes---------------------------------------------------------------------------------------------------------------
router.use(checkIfAuthorized);

router.route('/needs')
    .get((req, res, next) => {
        let user = req.user;
        organization.getNeeds(user)
            .then((needs) => {
                res.json({needs: needs});
            })
            .catch((error) =>{
                return next(error);
            });

    })
    .post((req, res, next) => {
        let user = req.user;
        let need = req.body;
        organization.addNeed(user, need)
            .then(() => {
                res.end();
            })
            .catch((error) =>{
                return next(error);
            });
    });

router.route('/needs/:id')
    .delete((req, res, next) => {
        let user = req.user;
        let id = req.params.id;
        organization.removeNeed(user, id)
            .then(() => {
                res.end();
            })
            .catch((error) =>{
                return next(error);
            });
    });

// Exports-------------------------------------------------------------------------------------------------------------
module.exports = router;
