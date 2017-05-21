/**
 * Volunteer-handling things.
 */

// Requires------------------------------------------------------------------------------------------------------------
let needs = require('./needhandlingresource');

// Functions----------------------------------------------------------------------------------------------------------

/**
 * Gets the needs that matches a user's given preferences.
 *
 * @param user {Object} the user to get the matches for.
 * @returns {Promise} a Promise that resolves with the matching needs
 * or rejects with an error.
 */
function getMatches(user) {
    return new Promise((resolve, reject) => {
        let query = {
            skillsDesired: {$in: user.profile.skills},
            applicants: {$nin: [user._id]}
        };

        needs.getNeeds(query)
            .then((result) => {
            console.log(result);
                resolve(result);
            })
            .catch((error) => {
                reject(error);
            });
    });
}

/**
 * Updates a user's profile.
 *
 * @param user {Object} the user to update-
 * @param profile {Object} the data to update the profile with.
 * @returns {Promise} a Promise that resolves with the updates user
 * or reject with an error.
 */
function updateProfile(user, profile) {
    return new Promise((resolve, reject) => {
        user.profile = profile;

        user.save()
            .then((result) => {
                resolve(result);
            })
            .catch((error) => {
                reject(error);
            });
    });
}

/**
 * Adds the user to the list of the applicants for a need.
 *
 * @param user {Object} The user to add.
 * @param application {Object} The need to add the user to.
 * @returns {Promise} a Promise that resolves when the user have been added
 * or reject with an error.
 */
function updateApplications(user, application) {
    return new Promise((resolve, reject) => {

        needs.updateApplicants(application._id, user._id)
            .then(() => {
                resolve();
            })
            .catch((error) => {
                reject(error);
            });
    });
}

/**
 * Returns an array with the needs a user have applied for.
 *
 * @param user {Object} the user whose applications to get.
 * @returns {Promise} a Promise that resolves with the applications
 * or rejects with an error.
 */
function getApplications(user) {
    return new Promise((resolve, reject) => {
        let query = {
            applicants: {$in: [user._id]}
        };

        needs.getNeeds(query)
            .then((result) => {
                resolve(result);
            })
            .catch((error) => {
                reject(error);
            });
    });
}


// Exports-------------------------------------------------------------------------------------------------------------
module.exports = {
    getMatches: getMatches,
    updateProfile: updateProfile,
    updateApplications: updateApplications,
    getApplications: getApplications
};
