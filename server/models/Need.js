/**
 * Model for a Need to be stored in the database.
 */

// Requires.
let mongoose = require('mongoose');

/**
 * Set up additional parameters for the Volunteer-User.
 */
let needSchema = new mongoose.Schema({
    _creator        : {type: String, ref: 'Organization'},
    applicants      : [{type: String, ref: 'Volunteer'}],
    title           : String,
    description     : String,
    shortDesc       : String,
    expiryDate      : {type: Date, default: new Date(new Date().getFullYear(), new Date().getMonth() + 1, 1)},
    skills          : [String]
});

/**
 * Model the Need.
 */
let Need = mongoose.model('Need', needSchema);

// Exports.
module.exports = Need;
