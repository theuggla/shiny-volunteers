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
                skillsNeeded: {$in: user.profile.skills},
                _id: {$not: {$in: user.applications}}
            })
            .sort({expiryDate: -1})
            .select({
                title           : 1,
                description     : 1,
                skillsNeeded    : 1,
                skillsRequired  : 1,
                location        : 1,
                timePerOccasion : 1,
                recurring       : 1,
                oneOff          : 1
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
                        _id             : need._id,
                        title           : need.title,
                        description     : need.description,
                        skillsNeeded    : need.skillsNeeded,
                        skillsRequired  : need.skillsRequired,
                        location        : need.location,
                        timePerOccasion : need.timePerOccasion,
                        recurring       : need.recurring,
                        oneOff          : need.oneOff
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
