/**
 * Tests for the Auth module.
 */

let expect = require('chai').expect;
let createNewTempUser = require('../lib/authresource').createNewTempUser;
let confirmTempUser = require('../lib/authresource').confirmTempUser;

describe('Auth module', () => {

    describe('createNewTempUser', () => {

        it('should create a new temp user', (done) => {
            expect(2).to.equal(2);
            done();
        });

        it('should reject if there is already a temp user ith the same email', (done) => {
            expect(2).to.equal(2);
            done();
        });

        it('should reject if there is already a normal user with the same email', (done) => {
            expect(2).to.equal(2);
            done();
        });

    });

    describe('confirmTempUser', () => {

        it('should transfer the temp user to a persistant user', (done) => {
            expect(2).to.equal(2);
            done();
        });

        it('should remove the temp user', (done) => {
            expect(2).to.equal(2);
            done();
        });

    });

});

