/**
 * Unit tests of the middleware.
 */

require('mocha');

let chai = require('chai');
let chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);
let expect = chai.expect;

let sinon = require('sinon');

let checkIfAuthorized = require('../middleware/middleware').checkIfAuthorized;
let validateLoginForm = require('../middleware/middleware').validateLoginForm;

describe('Middleware-tests', () => {

    describe('checkIfAuthorized', () => {


        let req = {headers: {}};
        let res = {};
        let next = sinon.spy();

        it('should call next if there is no authorization header', (done) => {
            checkIfAuthorized(req, res, next);
            expect(next.callCount).to.equal(1);
            done();
        });

    });

    describe('validateLoginForm', () => {
        let mainstatus;
        let mainsummary;
        let mainerrors;

        let req = {body: {}};
        let res = {status: function(stat) {return {summary: {}, errors: {}, send: function(response) {mainstatus = stat; mainsummary = response.summary; mainerrors = response.errors;}}}};
        let next = sinon.spy();

        it('should reject if there is no email', (done) => {
            validateLoginForm(req, res, next);
            expect(mainstatus).to.equal(400);
            expect(mainerrors.email).to.equal('Please provide an email address.');
            done();
        });

        it('should reject if email is not a string', (done) => {
            req.body.email = 22;

            validateLoginForm(req, res, next);
            expect(mainstatus).to.equal(400);
            expect(mainerrors.email).to.equal('Please provide an email address.');
            done();
        });

        it('should reject if email is not valid', (done) => {
            req.body.email = 'snabela';

            validateLoginForm(req, res, next);
            expect(mainstatus).to.equal(400);
            expect(mainerrors.email).to.equal('Please provide an email address.');
            done();
        });

        it('should reject if there is no password', (done) => {
            validateLoginForm(req, res, next);
            expect(mainstatus).to.equal(400);
            expect(mainerrors.password).to.equal('Please provide a password.');
            done();
        });

        it('should reject if password is not a string', (done) => {
            req.body.password = 22;

            validateLoginForm(req, res, next);
            expect(mainstatus).to.equal(400);
            expect(mainerrors.password).to.equal('Please provide a password.');
            done();
        });

    });
});
