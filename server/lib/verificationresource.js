let TempUser = require('../models/TempUser');
let mongoose = require('mongoose');
let verify = require('email-verification')(mongoose);

function connect() {
    verify.configure({
        verificationURL: process.env.SITE_URL + '/email-verification/${URL}',
        persistentUserModel: TempUser,
        tempUserCollection: 'tempusers',

        transportOptions: {
            service: 'SendGrid',
            auth: {
                api_key: process.env.SENDGRID_PASSWORD,
                api_user: process.env.SENDGRID_USERNAME
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

    verify.generateTempUserModel(TempUser, () => {});

}

module.exports = {
    connect: connect,
    verify: verify
};


