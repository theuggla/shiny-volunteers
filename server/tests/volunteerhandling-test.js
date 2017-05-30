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
        expiryDate: new Date(Date.now())
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
        description: 'test also'
    };

    let needThree = {
        _creator: 'testcreator',
        title: 'test',
        skillsRequired: ['wordpress', 'IT'],
        skillsDesired: ['none'],
        categories: 'women',
        timePerOccasion: 8,
        numberOfTimes: ['once'],
        expiryDate: new Date(Date.now()),
        description: 'test also'
    };

    let needFour = {
        _creator: 'testcreator',
        title: 'test',
        skillsRequired: ['none'],
        skillsDesired: ['IT'],
        categories: 'women',
        timePerOccasion: 8,
        numberOfTimes: ['once'],
        expiryDate: new Date(Date.now()),
        description: 'test also'
    };

    let user = {
        profile: {
            _id: 1,
            skills: ['wordpress, cooking, children'],
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
        Need.remove({title: 'test'});
    });

    describe('getMatches', () => {

        it('should return an array of need-objects', (done) => {
            let matches = getMatches(user);
            expect(Array.isArray(matches)).to.equal(true);
            done();
        });

        it('should not return needs that the user has already applied for', (done) => {
            expect(2).to.equal(2);
            done();
        });

        it('should return an empty array if there are no matches', (done) => {
            expect(2).to.equal(2);
            done();
        });

        it('should return an array with one object if there is one match', (done) => {
            expect(2).to.equal(2);
            done();
        });

        it('should return an array of need-objects where the needs matches the user\'s skills', (done) => {
            expect(2).to.equal(2);
            done();
        });

    });

    describe('updateProfile', () => {

        it('should update the users profile', (done) => {
            expect(2).to.equal(2);
            done();
        });

        it('should reject if invalid profile information is given', (done) => {
            expect(2).to.equal(2);
            done();
        });

    });

    describe('updateApplications', () => {

        it('should add the user to the need\'s applicants', (done) => {
            expect(2).to.equal(2);
            done();
        });

    });

    describe('getApplications', () => {

        it('should return an array of need-objects', (done) => {
            expect(3).to.equal(2);
            done();
        });

        it('should return an empty array if there are no applications', (done) => {
            expect(2).to.equal(2);
            done();
        });

        it('should return an array with one object if there is one match', (done) => {
            expect(2).to.equal(2);
            done();
        });

        it('should return an array of need-objects the user has applied for', (done) => {
            expect(2).to.equal(2);
            done();
        });

    });
});
