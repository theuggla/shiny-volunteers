/**
 * Tests for the database-resource.
 */

let expect = require('chai').expect;

let connect = require('./test-db').connect;
let isConnected = require('./test-db').isConnected;

describe('Database module', () => {

    describe('isConnected', () => {

        it('should return false before connection attempt has been made', (done) => {
            expect(isConnected).to.equal(false);
            done();
        });

    });

    describe('connect', () => {

        it('should change the value of isConnected', (done) => {
            let startValue = isConnected;

            if (!isConnected) connect();

            expect(expect(isConnected)).to.not.equal(startValue);

            done();
        });

    });
});
