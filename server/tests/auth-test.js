/**
 * Tests for the Auth module.
 */

let expect = require('chai').expect;
let createNewTempUser = require('../lib/authresource').createNewTempUser;
let confirmTempUser = require('../lib/authresource').confirmTempUser;

describe('Auth module', () => {

    describe('createNewTempUser', () => {

        it('Should work', (done) => {
            expect(2).to.equal(2);
            done();
        });

        it('Should work again', (done) => {
            expect(2).to.equal(2);
            done();
        });

    });

    describe('confirmTempUser', () => {

        it('Should work', (done) => {
            expect(2).to.equal(2);
            done();
        });

        it('Should work again', (done) => {
            expect(2).to.equal(2);
            done();
        });

    });

});

