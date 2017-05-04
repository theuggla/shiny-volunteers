/**
 * Organization-handling things.
 */

// Requires.
let Need = require('../models/Need');

// Functions----------------------------------------------------------------------------------------------------------
function getNeeds(user) {
    return new Promise((resolve, reject) => {
        Need
            .find({_creator: user._id})
            .then((result) => {
            console.log('returning');
            console.log(result[0]);
                return result.map((need) => {
                    return {
                        _id             : need._id,
                        title           : need.title,
                        description     : need.description,
                        skillsNeeded    : need.skillsNeeded,
                        skillsDesired   : need.skillsDesired,
                        location        : need.location,
                        timePerOccasion : need.timePerOccasion,
                        recurring       : need.recurring,
                        oneOff          : need.oneOff
                    };
                });

            })
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
        let newNeed = new Need({
            _creator        : user._id,
            title           : need.title,
            description     : need.description,
            skillsNeeded    : need.skillsNeeded
        });

        newNeed.save()
            .then((savedNeed) => {
                user.needs.push(savedNeed._id);

                return user.save();
            })
            .then(() => {
                resolve();
            })
            .catch((error) => {
                reject(error);
            });
    });
}

function removeNeed(user, id) {
    return new Promise((resolve, reject) => {
        Need
            .remove({_id: id})
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
