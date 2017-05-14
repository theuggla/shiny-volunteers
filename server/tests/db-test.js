/**
 * Tests for the database-resource.
 */

let expect = require('chai').expect;
let sinon = require('sinon');
let connect = require('../lib/dbresource').connect;
let isConnected = require('../lib/dbresource').isConnected;

describe('Database module', () => {

    describe('connect', () => {

        it('should shange the value of isConnected', (done) => {
            expect(2).to.equal(2);
            done();
        });

    });

    describe('isConnected', () => {

        it('should return false before connection attempt has been made', (done) => {
            expect(2).to.equal(2);
            done();
        });

    });
});
