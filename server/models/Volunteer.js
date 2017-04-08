/**
 * Model for a Volunteerto be stored in the database.
 */

//Requires.
let mongoose = require('mongoose');
let findOrCreate = require('mongoose-find-or-create');
let bcrypt = require('bcrypt-nodejs');
let Schema = mongoose.Schema;

/**
 * A schema for a User that takes:
 * @param facebookid {String} the facebookid
 * @param email {String} the email
 * @param type {String} the type of user
 */
let volunteerSchema = new Schema({
    id: {type: String},
    facebookid: {type: String},
    email: {type: String, unique: true, validate: {validator: function(v) {return /.+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/.test(v)}, message: 'email is not valid!'}},
    password: {type: String},
    roles: {type: [String]},
});

/**
 * Add findOrCreate-method to the schema.
 */
volunteerSchema.plugin(findOrCreate);

/**
 * Salts and hashes the password.
 */
volunteerSchema.methods.hashPasswordAndSave = function(password) {
    bcrypt.hash(password, 10, (err, hash) => {
        if (err) return err;
        this.password = hash;
        this.save();
    });
};


/**
 * Compares two passwords.
 */
volunteerSchema.methods.comparePassword = function(pass) {
    return new Promise((resolve, reject) => {
        bcrypt.compare(pass, this.password, function(err, res) {
            if (err) {
                reject(err);
            } else {
                resolve(res);
            }
        });
    });
};

/**
 * Model the user.
 */
let Volunteer = mongoose.model('Volunteer', volunteerSchema);

//Exports.
module.exports = Volunteer;
