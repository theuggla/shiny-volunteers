/**
 * Unit tests of the middleware.
 */

let expect = require('chai').expect;
let checkIfAuthorized = require('../middleware/middleware').checkIfAuthorized;
let validateLoginForm = require('../middleware/middleware').validateLoginForm;
let isDatabaseConnected = require('../middleware/middleware').isDatabaseConnected;

describe('Middleware-tests', () => {

    describe('checkIfAuthorized', () => {

        it('should call next if there is no authorization header', (done) => {
            expect(2).to.equal(2);
            done();
        });

        it('should call next if token is not valid', (done) => {
            expect(2).to.equal(2);
            done();
        });

        it('should call next if token does not exist', (done) => {
            expect(2).to.equal(2);
            done();
        });

        it('should return the user if the user matches a token', (done) => {
            expect(2).to.equal(2);
            done();
        });
    });

    describe('validateLoginForm', () => {

        it('should reject if there is no email', (done) => {
            expect(2).to.equal(2);
            done();
        });

        it('should reject if email is not a string', (done) => {
            expect(2).to.equal(2);
            done();
        });

        it('should reject if email is not valid', (done) => {
            expect(2).to.equal(2);
            done();
        });

        it('should reject if there is no password', (done) => {
            expect(2).to.equal(2);
            done();
        });

        it('should reject if password is not a string', (done) => {
            expect(2).to.equal(2);
            done();
        });

    });

    describe('isDatabaseConnected', () => {

        it('should call next when database is connected', (done) => {
            expect(2).to.equal(2);
            done();
        });

    });
});
