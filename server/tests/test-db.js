/**
 * A database for testing purposes.
 */
let mongoose = require('mongoose');
let isConnected = false;
let db;

/**
 * Connects to the database.
 */

function connect(secondDB) {
    return new Promise((resolve, reject) => {
        db = mongoose.connection;

        // Use native promises
        mongoose.Promise = global.Promise;

        db.on('error', () => {
            isConnected = false;
        });

        db.once('open', () => {
            isConnected = true;
            resolve();
        });

        // Close database connection if node process closes.
        process.on('SIGINT', () => {
            db.close(() => {
                process.exit(0);
            });
        });

        // Connect to the database
        if (secondDB) {
            mongoose.createConnection('mongodb://localhost/test');
        } else {
            mongoose.connect('mongodb://localhost/test')
                .catch((error) => {
                    if (error.name !== 'MongoError') {
                        reject(error);
                    } else {
                        resolve();
                    }
                });
        }
    });
}

function disconnect() {
    db.close();
}

// Exports.
module.exports = {
    connect: connect,
    isConnected: isConnected,
    disconnect: disconnect
};
