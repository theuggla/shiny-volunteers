/**
 * A TempUser to be used before email-verification.
 */

let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let TempUserSchema = new Schema({
    info: {
        email: {
            type: String,
            unique: true,
            sparse: true
        },
        roles: {
            type: [String],
            default: ['temp']
        }
    },
    local: {
        email: {
            type: String,
            validate: {
                validator: function (value) {
                    return (/.+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/).test(value);
                },
                message: 'email is not valid'
            }
        },
        password: String
    }
});

let TempUser = mongoose.model('TempUser', TempUserSchema);

module.exports = TempUser;
