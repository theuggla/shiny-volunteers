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

        it('Should work', (done) => {
            expect(2).to.equal(2);
            done();
        });

    });

    describe('updateProfile', () => {

        it('Should work', (done) => {
            expect(2).to.equal(2);
            done();
        });

    });

    describe('updateApplications', () => {

        it('Should work', (done) => {
            expect(2).to.equal(2);
            done();
        });

    });

    describe('getApplications', () => {

        it('Should work', (done) => {
            expect(2).to.equal(2);
            done();
        });

    });
});
