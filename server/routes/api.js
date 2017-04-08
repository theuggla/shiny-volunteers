/**
 * Router for the api pages.
 */

//Requires.
let router = require('express').Router();
let passport = require('passport');
let checkIfAuthorized = require('../middleware/middleware').checkIfAuthorized;

//Routes---------------------------------------------------------------------------------------------------------------

router.use(checkIfAuthorized);

router.get('/dashboard', (req, res) => {
    res.status(200).json({
        message: "You're authorized to see this secret message."
    });
});

//Exports-------------------------------------------------------------------------------------------------------------
module.exports = router;
