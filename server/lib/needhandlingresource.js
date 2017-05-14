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
                    .find(query)
                    .sort({expiryDate: -1});
            })
            .then((result) => {
                return result.map((need) => {
                    return {
                        _id: need._id,
                        title: need.title,
                        description: need.description,
                        skillsNeeded: need.skillsNeeded,
                        skillsDesired: need.skillsDesired,
                        location: need.location,
                        timePerOccasion: need.timePerOccasion,
                        recurring: need.recurring,
                        oneOff: need.oneOff
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
 * Creates a new need in the database.
 *
 * @param data {Object} the data to make the need with.
 * @returns {Promise} A promise that resolves
 * with the new need, or rejects with an error.
 */
function addNeed(data) {
    return new Promise((resolve, reject) => {
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
 * Adds an applicant to the nedd's list of applicants.
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
        let date = new Date();

        Need
            .find({expiryDate: {$lt: date}})
            .then((needs) => {
                needs.forEach((need) => {

                });
            })
            .remove({expiryDate: {$lt: date}})
            .then(() => {
                resolve();
            })
            .catch((error) => {
                reject(error);
            });
    });
}

// Exports ------------------------------------------------------------------------------------------------------------
module.exports = {
    getNeeds: getNeeds,
    addNeed: addNeed,
    removeNeed: removeNeed,
    updateApplicants: updateApplicants,
    cleanOutNeeds: cleanOutNeeds
};
