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
        it('Should work', (done) => {
            expect(2).to.equal(2);
            done();
        });
    });

    describe('Organization', () => {
        it('Should work', (done) => {
            expect(2).to.equal(2);
            done();
        });
    });

    describe('TempUser', () => {
        it('Should work', (done) => {
            expect(2).to.equal(2);
            done();
        });
    });

    describe('UserBase', () => {
        it('Should work', (done) => {
            expect(2).to.equal(2);
            done();
        });
    });

    describe('Volunteer', () => {
        it('Should work', (done) => {
            expect(2).to.equal(2);
            done();
        });
    });
});
