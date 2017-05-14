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
        location: String,
        skills: [String],
        interests: [String],
        timePerOccasion: Number,
        recurring: Boolean,
        oneOff: Boolean
    },
    facebook: {
        id: {
            type: String,
            unique: true,
            sparse: true
        },
        email: String
    }
});

/**
 * Model the user.
 */
let Volunteer = mongoose.model('Volunteer', volunteerSchema);

// Exports.
module.exports = Volunteer;
