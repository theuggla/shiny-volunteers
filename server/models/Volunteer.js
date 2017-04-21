/**
 * Model for a Volunteer to be stored in the database.
 */

// Requires.
let mongoose = require('mongoose');
let Schema = mongoose.Schema;
let userBase = require('./UserBase');

/**
 * Set up additional parameters for the Volunteer-User.
 */
let volunteerSchema = userBase({
    profile: {
        isComplete: Boolean,
        skills: [String],
        interests: [String],
        timePerWeek: Number,
        available: {
            monday: {
                morning: Boolean,
                day: Boolean,
                evening: Boolean
            },
            tuesday: {
                morning: Boolean,
                day: Boolean,
                evening: Boolean
            },
            wednesday: {
                morning: Boolean,
                day: Boolean,
                evening: Boolean
            },
            thursday: {
                morning: Boolean,
                day: Boolean,
                evening: Boolean
            },
            friday: {
                morning: Boolean,
                day: Boolean,
                evening: Boolean
            },
            saturday: {
                morning: Boolean,
                day: Boolean,
                evening: Boolean
            },
            sunday: {
                morning: Boolean,
                day: Boolean,
                evening: Boolean
            }
        }

    },
    applications: [{type: Schema.Types.ObjectId, ref: 'Need'}],
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
