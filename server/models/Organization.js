/**
 * Model for an Organization to be stored in the database.
 */

// Requires.
let mongoose = require('mongoose');
let Schema = mongoose.Schema;
let userBase = require('./UserBase');

/**
 * Set up additional parameters for the Organization-User.
 */
let organizationSchema = userBase({
    needs : [{type: Schema.Types.ObjectId, ref: 'Need'}]
});

/**
 * Model the user.
 */
let Organization = mongoose.model('Organization', organizationSchema);

// Exports.
module.exports = Organization;
