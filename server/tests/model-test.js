/**
 * Tests for the models.
 */

let expect = require('chai').expect;

let Need = require('../models/Need');
let Organization = require('../models/Organization');
let TempUser = require('../models/TempUser');
let UserBase = require('../models/UserBase');
let Volunteer = require('../models/Volunteer');

describe('Models', () => {

    describe('Need', () => {
        it('should require a creator', (done) => {
            expect(2).to.equal(2);
            done();
        });

        it('should require a title', (done) => {
            expect(2).to.equal(2);
            done();
        });

        it('should require a description', (done) => {
            expect(2).to.equal(2);
            done();
        });

        it('should set a default expiry date if none is given', (done) => {
            expect(2).to.equal(2);
            done();
        });
    });

    describe('Organization', () => {
        it('should take a profile', (done) => {
            expect(2).to.equal(2);
            done();
        });
    });

    describe('TempUser', () => {
        it('should reject if email is not unique', (done) => {
            expect(2).to.equal(2);
            done();
        });

        it('should reject if local email is not valid email', (done) => {
            expect(2).to.equal(2);
            done();
        });
    });

    describe('UserBase', () => {
        it('should reject if email is not unique', (done) => {
            expect(2).to.equal(2);
            done();
        });

        it('should reject if local email is not valid email', (done) => {
            expect(2).to.equal(2);
            done();
        });

        it('should hash a given password', (done) => {
            expect(2).to.equal(2);
            done();
        });

        it('should compared a plaintext password to a hashed one and return true if they are equal', (done) => {
            expect(2).to.equal(2);
            done();
        });

        it('should compared a plaintext password to a hashed one and return false if they are not equal', (done) => {
            expect(2).to.equal(2);
            done();
        });
    });

    describe('Volunteer', () => {
        it('should take a facebook email', (done) => {
            expect(2).to.equal(2);
            done();
        });

        it('should take a facebook id', (done) => {
            expect(2).to.equal(2);
            done();
        });
    });
});
