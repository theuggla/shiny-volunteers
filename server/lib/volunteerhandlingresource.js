/**
 * Volunteer-handling things.
 */

// Requires------------------------------------------------------------------------------------------------------------
let needs = require('./needhandlingresource');

// Functions----------------------------------------------------------------------------------------------------------
function getMatches(user) {
    return new Promise((resolve, reject) => {
        let query = {
            skillsNeeded: {$in: user.profile.skills},
            applicants: {$not: {$in: [user._id]}}
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
