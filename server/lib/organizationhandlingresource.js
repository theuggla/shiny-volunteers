/**
 * Organization-handling things.
 */

// Requires-----------------------------------------------------------------------------------------------------------
let needs = require('./needhandlingresource');

// Functions----------------------------------------------------------------------------------------------------------
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

function addNeed(user, need) {
    return new Promise((resolve, reject) => {
        let newNeed = {
            _creator        : user._id,
            title           : need.title,
            description     : need.description,
            skillsNeeded    : need.skillsNeeded
        };

        needs.addNeed(newNeed)
            .then(() => {
                resolve();
            })
            .catch((error) => {
                reject(error);
            });
    });
}

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
