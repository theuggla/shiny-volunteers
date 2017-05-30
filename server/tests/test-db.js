/**
 * A database for testing purposes.
 */
let mongoose = require('mongoose');
let isConnected = true;

/**
 * Connects to the database.
 */

function connect() {
    let db = mongoose.connection;

    // Use native promises
    mongoose.Promise = global.Promise;

    db.on('error', () => {
        isConnected = false;
    });

    db.once('open', () => {
        isConnected = true;
    });

    // Close database connection if node process closes.
    process.on('SIGINT', () => {
        db.close(() => {
            process.exit(0);
        });
    });

    // Connect to the database
    mongoose.connect('mongodb://localhost/test')
        .catch((error) => {
            console.error(error);
        });
}

// Exports.
module.exports = {
    connect: connect,
    isConnected: isConnected
};
