/**
 * Model for a Need to be stored in the database.
 */

// Requires.
let mongoose = require('mongoose');

/**
 * Set up parameters for the Need.
 */
let needSchema = new mongoose.Schema({
    _creator        : {type: String, ref: 'Organization', required: true},
    applicants      : [{type: String, ref: 'Volunteer'}],
    title           : {type: String, required: true},
    description     : {type: String, required: true},
    expiryDate      : {type: Date, default: new Date(new Date().getFullYear(), new Date().getMonth() + 1, 1)},
    skillsRequired  : [String],
    skillsDesired   : [String],
    location        : [String],
    when            : String,
    categories      : [String],
    timePerOccasion : Number,
    numberOfTimes   : [String],
    contact         : {type: String, required: true}
});

/**
 * Model the Need.
 */
let Need = mongoose.model('Need', needSchema);

// Exports.
module.exports = Need;
