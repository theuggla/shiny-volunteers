/**
 * Module to handle the Needs
 * against the database.
 */

// Requires -----------------------------------------------------------------------------------------------------------
let Need = require('../models/Need');

// Functions ----------------------------------------------------------------------------------------------------------

/**
 * Retrieves needs from the database matching a query.
 * Maps the relevant fields and sorts the needs by descending expiry date.
 *
 * @param query {Object} A mongoose query to find the needs by.
 * @returns {Promise} A Promise that resolves with an array of the needs,
 * or rejects with an error.
 */
function getNeeds(query) {
    return new Promise((resolve, reject) => {
        cleanOutNeeds()
            .then(() => {
                 return Need
                    .find(query);
            })
            .then((result) => {
                return result.map((need) => {
                    return {
                        _id: need._id,
                        title: need.title,
                        description: need.description,
                        skillsRequired: need.skillsRequired,
                        skillsDesired: need.skillsDesired,
                        location: need.location,
                        when: need.when,
                        timePerOccasion: need.timePerOccasion,
                        numberOfTimes: need.numberOfTimes,
                        contact: need.contact
                    };
                });
            })
            .then((needs) => {
                resolve(needs);
            })
            .catch((error) => {
                reject(error);
            });
    });
}

/**
 * Gets an array of needs where the required skills matches skills the user have, sorted
 * by which matches the most of the need's desired skills against the user's skills.
 *
 * @param skills {[String]} the skills to match by.
 * @param query {object} the mongoose-query to filter the matches by.
 * @returns {Promise} that resolves with the matches or rejects with an error.
 */
function getMatchesBySkills(skills, query) {
    return new Promise((resolve, reject) => {
        getNeeds(query)
            .then((result) => {
                return matchByRequiredSkills(result, skills);
            })
            .then((result) => {
                return sortByDesiredSkills(result, skills);
            })
            .then((result) => {
                resolve(result);
            })
            .catch((error) => {
                reject(error);
            });
    });
}

/**
 * Creates a new need in the database.
 *
 * @param data {Object} the data to make the need with.
 * @returns {Promise} A promise that resolves
 * with the new need, or rejects with an error.
 */
function addNeed(data) {
    return new Promise((resolve, reject) => {
        if (data.expiryDate) data.expiryDate = new Date(data.expiryDate);

        let newNeed = new Need(data);

        newNeed.save()
            .then((need) => {
                resolve(need);
            })
            .catch((error) => {
                reject(error);
            });
    });
}

/**
 * Removes a need from the database.
 *
 * @param id {String} the id of the need to remove.
 * @returns {Promise} a promise that resolves when the need is deleted or
 * rejects with an error.
 */
function removeNeed(id) {
    return new Promise((resolve, reject) => {
        Need
            .remove({_id: id})
            .then(() => {
                resolve();
            })
            .catch((error) => {
                reject(error);
            });
    });
}

/**
 * Adds an applicant to the need's list of applicants.
 *
 * @param id {String} the id of the need.
 * @param applicantid {String} the id of the applicant.
 * @returns {Promise} a Promise that resolves when the applicant has been added
 * or rejects with an error.
 */
function updateApplicants(id, applicantid) {
    return new Promise((resolve, reject) => {
        Need.findById(id)
            .then((need) => {
                need.applicants.push(applicantid);

                return need.save();
            })
            .then((result) => {
                resolve(result);
            })
            .catch((error) => {
                reject(error);
            });
    });
}

/**
 * Deletes all needs that have an expiry date that's already passed from the database.
 *
 * @returns {Promise} a Promise that resolves when the needs have been deleted or
 * rejects with an error.
 */
function cleanOutNeeds() {
    return new Promise((resolve, reject) => {
        Need
            .remove({expiryDate: {$lt: Date.now()}})
            .then(() => {
                resolve();
            })
            .catch((error) => {
                reject(error);
            });
    });
}

/**
 * Returns an array of needs where the required skills all matches the user's actual skills, or the required skills
 * are none.
 *
 * @param needs {[need]} the needs to match.
 * @param skills {[string]} the skills to match against.
 * @returns {Promise} that resolves with the matched needs or rejects with an error.
 */
function matchByRequiredSkills(needs, skills) {
    return new Promise((resolve, reject) => {

        if (skills.indexOf('none') >= 0) {
            resolve(needs);
        }
        else {
            let result = needs.filter((need) => {
                if (need.skillsRequired.indexOf('None') >= 0) {
                    return true;
                } else {
                    return need.skillsRequired.every((value) => {
                        return (skills.indexOf(value) >= 0);
                    });
                }
            });

            resolve(result);
        }
    });
}

/**
 * Sorts an array of needs after which has the most desired skills matching the
 * user's actual skills.
 * @param needs {[needs]} the needs to sort.
 * @param skills {[string]} the skills to sort against.
 * @returns {Promise} that resolves with the sorted array or rejects with an error.
 */
function sortByDesiredSkills(needs, skills) {
    return new Promise((resolve, reject) => {
        let haveMostDesiredSkills = function(a, b) {
            let aLength = a.skillsDesired.filter((n) => {
                return skills.indexOf(n) !== -1;
            }).length;

            let bLength = b.skillsDesired.filter((n) => {
                return skills.indexOf(n) !== -1;
            }).length;

            return bLength - aLength;
        };

        let sorted = needs.sort((a, b) => haveMostDesiredSkills(a, b));

        resolve(sorted);
    });
}

// Exports ------------------------------------------------------------------------------------------------------------
module.exports = {
    getNeeds: getNeeds,
    addNeed: addNeed,
    removeNeed: removeNeed,
    updateApplicants: updateApplicants,
    getMatchesBySkills: getMatchesBySkills,
    cleanOutNeeds: cleanOutNeeds
};
