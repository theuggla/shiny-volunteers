/**
 * Tests for the volunteer handling-resource.
 */

let expect = require('chai').expect;
let sinon = require('sinon');
let getMatches = require('../lib/volunteerhandlingresource').getMatches;
let updateProfile = require('../lib/volunteerhandlingresource').updateProfile;
let updateApplications = require('../lib/volunteerhandlingresource').updateApplications;
let getApplications = require('../lib/volunteerhandlingresource').getApplications;

describe('volunteer handling module', () => {

    describe('getMatches', () => {

        it('should return an array of need-objects', (done) => {
            expect(2).to.equal(2);
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
            expect(2).to.equal(2);
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
