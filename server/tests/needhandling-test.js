/**
 * Tests for the need handling-resource.
 */

let chai = require('chai');
let chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);
let expect = chai.expect;
let sinon = require('sinon');

let db = require('./test-db');
if (!db.isConnected) db.connect();

let addNeed = require('../lib/needhandlingresource').addNeed;
let getNeeds = require('../lib/needhandlingresource').getNeeds;
let removeNeed = require('../lib/needhandlingresource').removeNeed;
let updateApplicants = require('../lib/needhandlingresource').updateApplicants;
let cleanOutNeeds = require('../lib/needhandlingresource').cleanOutNeeds;
let Need = require('../models/Need');

describe('Need handling module', () => {

    let needOne = {
        _creator: 'testcreator',
        title: 'test',
        description: 'test',
        expiryDate: new Date(),
        contact: 'test@test.com'
    };

    let needTwo = {
        _creator: 'testcreator',
        title: 'test',
        description: 'test also',
        contact: 'test@test.com'
    };

    before('add needs to database', () => {
        Promise.all([addNeed(needOne), addNeed(needTwo)]);
    });

    after('clean up database', () => {
        Need.remove({title: 'test'});
    });

    describe('addNeed', () => {

        it('Should add a need to the database', () => {

            addNeed(needOne)
                .then(() => {
                    return expect(Need.find({title: 'test'})).to.eventually.equal(1);
                });
        });

        it('Should reject if no valid data is passed', () => {
            return expect(addNeed({})).to.be.rejected;
        });

    });

    describe('getNeeds', () => {

        it('should return needs by simple query', () => {
            let query = {title: 'test'};

            getNeeds(query)
                .then((needs) => {
                    return Promise.resolve(needs.length);
                })
                .then((length) => {
                    return expect(length).to.eventually.equal(1);
                });
        });

        it('should return needs by more complex query', () => {
            let query = {
                title: 'test',
                description: {$not: {$in: ['test']}}
            };

            getNeeds(query)
                .then((needs) => {
                    return Promise.resolve(needs.length);
                })
                .then((length) => {
                    return expect(length).to.eventually.equal(1);
                });
        });

        it('should return empty array if no needs matches the query', () => {
            let query = {
                title: 'not test'
            };

            getNeeds(query)
                .then((needs) => {
                    return Promise.resolve(needs.length);
                })
                .then((length) => {
                    return expect(length).to.eventually.equal(0);
                });
        });

    });

    describe('removeNeed', () => {

        it('should remove a need with the matching id from the database', () => {
            Need.find({title: 'test'})
                .then((needs) => {
                    return removeNeed(needs[0]._id);
                })
                .then(() => {
                    return expect(Need.find({title: 'title'})).to.eventually.have.length(1);
                });
        });

        it('Should do nothing if no need with the matching id exists', () => {
            let id = 22;

            removeNeed(id)
                .then(() => {
                    return expect(removeNeed(id)).to.be.fulfilled;
                });
        });

    });

    describe('updateApplicants', () => {

        it('Should add the applicant-id to the need\'s list of applicants', () => {
            Need.find({title: 'test'})
                .then((needs) => {
                    id = needs[0]._id;

                    return updateApplicants(id, 'testid');
                })
                .then(() => {
                    return expect(Need.find({title: 'title'}).then(o => o.applicants.length)).to.eventually.equal(1);
                });
        });

        it('Should do nothing if the need-id does not exist', () => {
            let id;

            Need.find({title: 'test'})
                .then((needs) => {
                    id = needs[0]._id;

                    return removeNeed(id);
                })
                .then(() => {
                    return expect(updateApplicants(id, 'testid')).to.be.fulfilled;
                });
        });

    });

    describe('cleanOutNeeds', () => {

        it('should remove all needs with passed expiry dates', () => {
            cleanOutNeeds()
                .then(() => {
                    return getNeeds({title: 'test'});
                })
                .then((needs) => {
                    return Promise.resolve(needs.length);
                })
                .then((length) => {
                    return expect(length).to.eventually.equal(0);
                });
        });

        it('should do nothing if there are no needs with passed expiry dates', () => {
            let needThree = {
                _creator: 'testcreator',
                title: 'test',
                description: 'test'
            };

            addNeed(needThree)
                .then(() => {
                    return expect(cleanOutNeeds().then(() => getNeeds({title: 'test'})).then(needs => needs.length)).to.eventually.equal(1);
                });
        });

        it('should do nothing if there are no needs', () => {
            Need.remove({title: 'test'})
                .then(() => {
                    return expect(cleanOutNeeds()).to.be.fulfilled;
                });
        });

    });
});
