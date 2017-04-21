/**
 * Router for the organization handling pages.
 */

// Requires.
let router = require('express').Router();
let checkIfAuthorized = require('../middleware/middleware').checkIfAuthorized;

// Routes---------------------------------------------------------------------------------------------------------------
router.use(checkIfAuthorized);

router.post('/needs/add', (req, res, next) => {
    let user = req.user;
    console.log('made it to the add need');
    console.log('with');
    console.log(req.body);
    console.log('for user');
    console.log(user);
});

router.get('/needs/add', (req, res, next) => {
    res.json({profile: req.user.profile});
});


// Exports-------------------------------------------------------------------------------------------------------------
module.exports = router;
