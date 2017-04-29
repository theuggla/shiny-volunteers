/**
 * Module to handle the email sending.
 */


// Requires.
let nodemailer = require('nodemailer');
let sendgrid = require('nodemailer-sendgrid-transport');

// Configs.
let auth = {
    auth: {
        api_key: process.env.SENDGRID_PASSWORD,
        api_user: process.env.SENDGRID_USERNAME
    }
};

let mailsender = nodemailer.createTransport(sendgrid(auth));


module.exports.sendMail = function() {
    let email = {
        from: 'do-not-reply@spark-the-revolution.com',
        to: ['mopooy@gmail.com'],
        subject: 'Hey you, awesome sendgridder!',
        html: '<b>Wow Big powerful letters</b>'
    };
    return new Promise((resolve, reject) => {
        mailsender.sendMail(email, (err, info) => {
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
