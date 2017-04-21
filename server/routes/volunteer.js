/**
 * Router for the volunteer handling pages.
 */

// Requires.
let router = require('express').Router();
let checkIfAuthorized = require('../middleware/middleware').checkIfAuthorized;

// Routes---------------------------------------------------------------------------------------------------------------
router.use(checkIfAuthorized);

router.post('/profile', (req, res, next) => {
    let user = req.user;
    user.profile = req.body;
    user.save()
        .then(() => {
            res.redirect('volunteer/profile');
        });

});

router.get('/profile', (req, res, next) => {
    res.json({profile: req.user.profile});
});


// Exports-------------------------------------------------------------------------------------------------------------
module.exports = router;