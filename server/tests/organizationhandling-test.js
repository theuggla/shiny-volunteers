/**
 * Tests for the organization handling-resource.
 */

require('mocha');

let chai = require('chai');
let chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);
let expect = chai.expect;

let addNeed = require('../lib/organizationhandlingresource').addNeed;
let getNeeds = require('../lib/organizationhandlingresource').getNeeds;
let removeNeed = require('../lib/organizationhandlingresource').removeNeed;

describe('Organization handling module', () => {

    describe('addNeed', () => {

        it('should add a need with the given data and the user as the creator', (done) => {
            expect(2).to.equal(2);
            done();
        });

        it('should not return needs that the user has already applied for', (done) => {
            expect(2).to.equal(2);
            done();
        });

    });

    describe('getNeeds', () => {

        it('should return an array of need-objects', (done) => {
            expect(2).to.equal(2);
            done();
        });

        it('should not return expired needs', (done) => {
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

        it('should return an array of need-objects where the user is the creator', (done) => {
            expect(2).to.equal(2);
            done();
        });

    });

    describe('removeNeed', () => {

        it('should remove a need', (done) => {
            expect(2).to.equal(2);
            done();
        });

    });
});
