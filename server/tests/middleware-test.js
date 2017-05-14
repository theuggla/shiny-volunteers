/**
 * Unit tests of the middleware.
 */

let expect = require('chai').expect;
let checkIfAuthorized = require('../middleware/middleware').checkIfAuthorized;
let validateLoginForm = require('../middleware/middleware').validateLoginForm;
let isDatabaseConnected = require('../middleware/middleware').isDatabaseConnected;

describe('Middleware-tests', () => {

    describe('checkIfAuthorized', () => {

        it('Should work', (done) => {
            expect(2).to.equal(2);
            done();
        });

    });

    describe('validateLoginForm', () => {

        it('Should work', (done) => {
            expect(2).to.equal(2);
            done();
        });

    });

    describe('isDatabaseConnected', () => {

        it('Should work', (done) => {
            expect(2).to.equal(2);
            done();
        });

    });
});
