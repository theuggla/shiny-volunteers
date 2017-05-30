/**
 * A database for testing purposes.
 */

let mongoose = require('mongoose');
require('mocha');

mongoose.connect('mongodb://localhost/test');

let connection = mongoose.connection;

before((done) => {
    connection.on('open', () => {
        connection.db.dropDatabase();
        done();
    });

});

after((done) => {
    connection.close();
    done();
});

module.exports = afterEach((done) => {
    connection.db.dropDatabase();
    done();
});
