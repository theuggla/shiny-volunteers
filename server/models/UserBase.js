/**
 * A base for the User model, to be extended by the Volunteer-
 * and Organization-models.
 */

let mongoose = require('mongoose');
let findOrCreate = require('mongoose-find-or-create');
let bcrypt = require('bcrypt-nodejs');
let Schema = mongoose.Schema;

module.exports = function(paths) {

    let schema = new Schema({
        info: {
            email: {
                type: String,
                unique: true
            },
            roles: [String]
        },
        local: {
            email: {
                type: String,
                unique: true,
                validate: {
                    validator: function (value) {
                        return (/.+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/).test(value);
                    },
                    message: 'email is not valid!'
                }
            },
            password: String
        },
        facebook: {
            id: {
                type: String,
                unique: true
            },
            email: String
        }
    });

    schema.add(paths);

    /**
     * Add findOrCreate-method to the schema.
     */
    schema.plugin(findOrCreate);

    /**
     * Salts and hashes the password.
     */
    schema.methods.hashPasswordAndSave = function(password) {
        bcrypt.hash(password, null, null, (err, hash) => {
            if (err) return err;
            this.password = hash;
            this.save();
        });
    };


    /**
     * Compares two passwords.
     * @param pass {string} the password to compare.
     * @returns {Promise} a Promise that resolves
     * true if the password is correct
     * false if it is not correct
     * or rejects with an error.
     */
    schema.methods.comparePassword = function(pass) {
        return new Promise((resolve, reject) => {
            bcrypt.compare(pass, this.password, (err, res) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(res);
                }
            });
        });
    };

    return schema;
};
