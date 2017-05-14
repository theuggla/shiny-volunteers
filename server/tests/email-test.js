/**
 * Tests for the email-resource.
 */

let expect = require('chai').expect;
let sinon = require('sinon');
let sendMailToUser = require('../lib/emailresource').sendMailToUser;
let sendApplicationMail = require('../lib/emailresource').sendApplicationMail;

describe('Email module', () => {

    describe('sendMailToUser', () => {

        it('Should work', (done) => {
            expect(2).to.equal(2);
            done();
        });

    });

    describe('sendApplicationMail', () => {

        it('Should work', (done) => {
            expect(2).to.equal(2);
            done();
        });

    });
});
