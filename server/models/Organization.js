/**
 * Model for an Organization to be stored in the database.
 */

// Requires.
let mongoose = require('mongoose');
let userBase = require('./UserBase');

/**
 * Set up additional parameters for the Volunteer-User.
 */
let organizationSchema = userBase({
    needs: [{Object}]
});

/**
 * Model the user.
 */
let Organization = mongoose.model('Organization', organizationSchema);

// Exports.
module.exports = Organization;
