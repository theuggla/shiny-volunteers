/**
 * Organization-handling things.
 */

// Requires-----------------------------------------------------------------------------------------------------------
let needs = require('./needhandlingresource');

// Functions----------------------------------------------------------------------------------------------------------

/**
 * Returns the needs a user have created.
 *
 * @param user {Object} the user to get the needs for.
 * @returns {Promise} a Promise that resolves with the needs
 * or rejects with an error.
 */
function getNeeds(user) {
    return new Promise((resolve, reject) => {
        let query = {_creator: user._id};

        needs.getNeeds(query)
            .then((result) => {
                resolve(result);
            })
            .catch((error) => {
                reject(error);
            });
    });
}

/**
 * Adds a need to the database with the user as the creator.
 *
 * @param user {Object} the user adding the need.
 * @param need {Object} the need to add.
 * @returns {Promise} a Promise that resolves when the need have been added
 * or rejects with an error.
 */
function addNeed(user, need) {
    return new Promise((resolve, reject) => {
        let newNeed = need;
        newNeed._creator = user._id;

        needs.addNeed(newNeed)
            .then(() => {
                resolve();
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
 * @returns {Promise} a Promise that resolves when the need has been removed
 * or rejects with an error.
 */
function removeNeed(id) {
    return new Promise((resolve, reject) => {
        needs.removeNeed(id)
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
    getNeeds: getNeeds,
    addNeed: addNeed,
    removeNeed: removeNeed
};
