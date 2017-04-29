/**
 * Module to handle the email sending.
 */


// Requires.
let nodemailer = require('nodemailer');
let mailgun = require('nodemailer-mailgun-transport');

// Configs.
let auth = {
    auth: {
        api_key: process.env.MAILGUN_API_KEY,
        domain: process.env.MAILGUN_DOMAIN
    }
};

let mailsender = nodemailer.createTransport(mailgun(auth));


module.exports.sendMail = function() {
    return new Promise((resolve, reject) => {
        mailsender.sendMail({
                from: 'do-not-reply@spark-the-revolution.com',
                to: 'mopooy@gmail.com',
                subject: 'Hey you, awesome!',
                html: '<b>Wow Big powerful letters</b>'},

            (err, info) => {
                if (err) {
                    console.log('Error: ' + err);
                    reject(err);
                }
                else {
                    console.log('Response: ' + info);
                    resolve(info);
                }
            });
    });
};
