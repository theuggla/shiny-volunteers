/**
 * Volunteer-handling things.
 */

// Requires.
let Need = require('../models/Need');
let Volunteer = require('../models/Volunteer');

// Functions----------------------------------------------------------------------------------------------------------
function getMatches(user) {
    return new Promise((resolve, reject) => {
        Need
            .find({
                skills: {$in: user.profile.skills},
                _id: {$not: {$in: user.applications}}
            })
            .sort({expiryDate: -1})
            .select({
                skills          : 1,
                title           : 1,
                description     : 1,
                expiryDate      : 1
            })
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
        Need
            .findById(application._id)
            .then((need) => {
                user.applications.push(application._id);
                need.applicants.push(user._id);

                return Promise.all([user.save(), need.save()]);
            })
            .then((result) => {
                resolve(result);
            })
            .catch((error) => {
                reject(error);
            });
    });
}

function getApplications(user) {
    return new Promise((resolve, reject) => {
        Volunteer.findById(user._id)
            .populate('applications')
            .exec((err, result) => {
                if (err) {
                    reject(err);
                }

                let mappedResult = result.applications.map((need) => {
                    return {
                        _id: need._id,
                        title: need.title,
                        description: need.description,
                        skills: need.skills,
                        expiryDate: need.expiryDate.toLocaleDateString()
                    };
                });

                resolve(mappedResult);
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
