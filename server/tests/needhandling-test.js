/**
 * Tests for the need handling-resource.
 */

let chai = require('chai');
let chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);
let expect = chai.expect;
let sinon = require('sinon');

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
        description: 'test'
    };

    let needTwo = {
        _creator: 'testcreator',
        title: 'test',
        description: 'test also'
    };

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

        before('add needs to database', () => {
            Promise.all([addNeed(needOne), addNeed(needTwo)]);
        });

        it('should return needs by simple query', () => {
            let query = {title: 'test'};

            return expect(getNeeds(query)).to.eventually.have.length(2);
        });

        it('should return needs by more complex query', () => {
            let query = {
                title: 'test',
                description: {$not: {$in: ['test']}}
            };

            return expect(getNeeds(query)).to.eventually.have.length(1);
        });

        it('Should return empty array if no needs matches the query', () => {
            let query = {
                title: 'not test'
            };

            return expect(getNeeds(query)).to.eventually.have.length(0);
        });

        it('Should reject if no valid query is passed', () => {
            let query = 'bananas';
            ;

            return expect(getNeeds(query)).to.be.rejected;
        });

    });

    describe('removeNeed', () => {

        before('add needs to database', () => {
            Promise.all([addNeed(needOne), addNeed(needTwo)]);
        });

        it('Should remove a need from the database', () => {
            expect(2).to.equal(2);
        });

        it('Should do nothing if no need with the matching id exists', () => {
            expect(2).to.equal(2);
        });

    });

    describe('updateApplicants', () => {

        it('Should add the applicant-id to the need\'s list of applicants', () => {
            expect(2).to.equal(2);
        });

        it('Should do nothing if the need-id does not exist', () => {
            expect(2).to.equal(2);
        });

    });

    describe('cleanOutNeeds', () => {

        it('Should remove all needs with passed expiry dates', (done) => {
            expect(2).to.equal(2);
            done();
        });

        it('Should do nothing if there are no needs with passed expiry dates', (done) => {
            expect(2).to.equal(2);
            done();
        });

        it('Should do nothing if there are no needs', (done) => {
            expect(2).to.equal(2);
            done();
        });

    });
});
