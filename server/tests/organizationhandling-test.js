/**
 * Tests for the organization handling-resource.
 */

let expect = require('chai').expect;
let sinon = require('sinon');
let addNeed = require('../lib/organizationhandlingresource').addNeed;
let getNeeds = require('../lib/organizationhandlingresource').getNeeds;
let removeNeed = require('../lib/organizationhandlingresource').removeNeed;

describe('Organization handling module', () => {

    describe('addNeed', () => {

        it('Should work', (done) => {
            expect(2).to.equal(2);
            done();
        });

    });

    describe('getNeeds', () => {

        it('Should work', (done) => {
            expect(2).to.equal(2);
            done();
        });

    });

    describe('removeNeed', () => {

        it('Should work', (done) => {
            expect(2).to.equal(2);
            done();
        });

    });
});
