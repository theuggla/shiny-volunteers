/**
 * Tests for the volunteer handling-resource.
 */

require('mocha');

let chai = require('chai');
let chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);
let expect = chai.expect;
let sinon = require('sinon');

let db = require('./test-db');
db.connect();

let getMatches = require('../lib/volunteerhandlingresource').getMatches;
let updateProfile = require('../lib/volunteerhandlingresource').updateProfile;
let updateApplications = require('../lib/volunteerhandlingresource').updateApplications;
let getApplications = require('../lib/volunteerhandlingresource').getApplications;

let addNeed = require('../lib/needhandlingresource').addNeed;
let getNeeds = require('../lib/needhandlingresource').getNeeds;
let removeNeed = require('../lib/needhandlingresource').removeNeed;
let updateApplicants = require('../lib/needhandlingresource').updateApplicants;
let cleanOutNeeds = require('../lib/needhandlingresource').cleanOutNeeds;
let Need = require('../models/Need');
let User = require('../models/Volunteer');

describe('volunteer handling module', () => {

    let needOne = {
        _creator: 'testcreator',
        title: 'test',
        description: 'test',
        skillsRequired: ['wordpress', 'cooking'],
        skillsDesired: ['IT', 'children'],
        categories: 'women',
        timePerOccasion: 8,
        numberOfTimes: ['once'],
        expiryDate: new Date(Date.now()),
        contact: 'test@test.com'
    };

    let needTwo = {
        _creator: 'testcreator',
        title: 'test',
        skillsRequired: ['wordpress'],
        skillsDesired: ['IT', 'children'],
        categories: 'women',
        timePerOccasion: 8,
        numberOfTimes: ['once'],
        expiryDate: new Date(Date.now()),
        description: 'test also',
        contact: 'test@test.com'
    };

    let needThree = {
        _creator: 'testcreator',
        title: 'addapplicant',
        skillsRequired: ['wordpress', 'IT'],
        skillsDesired: ['none'],
        categories: 'women',
        timePerOccasion: 8,
        numberOfTimes: ['once'],
        expiryDate: new Date(Date.now()),
        description: 'test also',
        contact: 'test@test.com'
    };

    let needFour = {
        _creator: 'testcreator',
        title: 'test',
        applicants: [1, 3],
        skillsRequired: ['IT'],
        skillsDesired: ['wordpress'],
        categories: 'women',
        timePerOccasion: 8,
        numberOfTimes: ['once'],
        expiryDate: new Date(Date.now()),
        description: 'test also',
        contact: 'test@test.com'
    };

    let user = {
        profile: {
            _id: 1,
            skills: ['wordpress, cooking, children'],
            location: ['gothenburg'],
            numberOfTimes: ['once'],
            timePerOccasion: 10,
            interests: ['women'],
            email: 'test@test.com'
        }
    };

    let noMatchUser = {
        profile: {
            _id: 2,
            skills: ['cooking, children'],
            location: ['gothenburg'],
            numberOfTimes: ['once'],
            timePerOccasion: 10,
            interests: ['women']
        }
    };

    let oneMatchUser = {
        profile: {
            _id: 3,
            skills: ['wordpress'],
            location: ['gothenburg'],
            numberOfTimes: ['once'],
            timePerOccasion: 10,
            interests: ['women']
        }
    };

    before('add needs to database', () => {
        Promise.all([addNeed(needOne), addNeed(needTwo), addNeed(needThree), addNeed(needFour)]);
    });

    after('clean up database', () => {
        Need.remove({_creator: 'testcreator'});
    });

    describe('getMatches', () => {

        it('should return an array of need-objects', () => {
            return expect(Array.isArray(getMatches(user))).to.eventually.equal(true);
        });

        it('should not return needs that the user has already applied for', () => {
            getMatches(user)
                .then((matches) => {
                    let filter = matches.filter((match) => {return match.applicants.contains(1)});
                    return Promise.resolve(filter.length);
                })
                .then((length) => {
                    return expect(length).to.equal(1);
                });
        });

        it('should return an empty array if there are no matches', () => {
            getMatches(noMatchUser)
                .then((matches) => {
                    return Promise.resolve(matches.length);
                })
                .then((length) => {
                    return expect(length).to.equal(0);
                });
        });

        it('should return an array with one object if there is one match', () => {
            getMatches(oneMatchUser)
                .then((matches) => {
                    return Promise.resolve(matches.length);
                })
                .then((length) => {
                    return expect(length).to.equal(1);
                });
        });

    });

    describe('updateProfile', () => {

        it('should update the users profile', () => {
            let user = new User(user);

            user.save()
                .then(() => {
                    return updateProfile(user, noMatchUser);
                })
                .then((user) => {
                  return Promise.resolve(user.skills);
                })
                .then((skills) => {
                    return expect(skills).to.eventually.equal(noMatchUser.skills);
                });
        });

        it('should reject if invalid profile information is given', () => {
            let user = new User(user);

            user.save()
                .then(() => {
                    return expect(updateProfile(user, {})).to.be.rejected;
                });
        });

    });

    describe('updateApplications', () => {

        it('should add the user to the need\'s applicants', () => {
            Need.find({title: 'addapplicant'})
                .then((need) => {
                    return updateApplicants(user._id, need._id);
                })
                .then(() => {
                    return Need.find({title: 'addapplicant'});
                })
                .then((need) => {
                    return Promise.resolve(need.applicants.indexOf(1));
                })
                .then((result) => {
                    return expect(result > 0).to.eventually.equal(true);
                });
        });

    });

    describe('getApplications', () => {

        it('should return an array of need-objects', () => {
            getApplications(user)
                .then((applications) => {
                    return Promise.resolve(applications.length);
                })
                .then((length) => {
                    return expect(length).to.eventually.equal(2);
                });
        });

        it('should return an empty array if there are no applications', () => {
            getApplications(noMatchUser)
                .then((applications) => {
                    return Promise.resolve(applications.length);
                })
                .then((length) => {
                    return expect(length).to.eventually.equal(0);
                });
        });

        it('should return an array with one object if there is one match', () => {
            getApplications(oneMatchUser)
                .then((applications) => {
                    return Promise.resolve(applications.length);
                })
                .then((length) => {
                    return expect(length).to.eventually.equal(1);
                });
        });
    });
});
