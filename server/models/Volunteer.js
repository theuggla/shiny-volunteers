/**
 * Model for a Volunteer to be stored in the database.
 */

// Requires.
let mongoose = require('mongoose');
let userBase = require('./UserBase');

/**
 * Set up additional parameters for the Volunteer-User.
 */
let volunteerSchema = userBase({
    profile: {
        isComplete: Boolean
    }
});

/**
 * Model the user.
 */
let Volunteer = mongoose.model('Volunteer', volunteerSchema);

// Exports.
module.exports = Volunteer;
