/**
 * Model for an Organization to be stored in the database.
 * At this point mostly a placeholder for further development
 * and a way to recognize organizations.
 */

// Requires.
let mongoose = require('mongoose');
let userBase = require('./UserBase');

/**
 * Set up additional parameters for the Organization-User.
 */
let organizationSchema = userBase({
    profile : {}
});

/**
 * Model the user.
 */
let Organization = mongoose.model('Organization', organizationSchema);

// Exports.
module.exports = Organization;
