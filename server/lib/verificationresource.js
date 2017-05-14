/**
 * Module for controlling the
 * email verification configures emails
 * against the verification-module.
 */

// Requires -----------------------------------------------------------------------------------------------------------
let TempUser = require('../models/TempUser');
let mongoose = require('mongoose');
let verify = require('email-verification')(mongoose);

// Functions ---------------------------------------------------------------------------------------------------------
function connect() {
    verify.configure({
        verificationURL: process.env.SITE_URL + '/login/email-verification/${URL}',
        persistentUserModel: TempUser,
        tempUserModel: TempUser,
        tempUserCollection: 'tempusers',

        transportOptions: {
            service: 'SendGrid',
            auth: {
                user: process.env.SENDGRID_USERNAME,
                pass: process.env.SENDGRID_PASSWORD
            }
        },
        verifyMailOptions: {
            from: 'do-not-reply@spark-the-revolution.com',
            subject: 'Please confirm account',
            html: 'Click the following link to confirm your account:</p><p>${URL}</p>',
            text: 'Please confirm your account by clicking the following link: ${URL}'
        },
        emailFieldName: 'local.email'
    }, () => {});
}

// Exports -----------------------------------------------------------------------------------------------------------
module.exports = {
    connect: connect,
    verify: verify
};


