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

// Models.
let email = {
    from: 'do-not-reply@spark-the-revolution.com',
    to: [],
    subject: 'Your sparkly application'
};

let userHtmlModel = {
    preTitle: '<b>Thanks for applying for the ',
    postTitle: ' need</b>',
    body: '<p>The organization has been forwarded your profile and will be in contact as soon as possible.</p>'
};
let applicationHtmlModel;

// Mail functions.
module.exports.sendMailToUser = function(user, need) {
    let usermail = email;

    usermail.to.push(user.info.email);
    usermail.html = userHtmlModel.preTitle + '"' + need.title + '"' + userHtmlModel.postTitle + userHtmlModel.body;

    return new Promise((resolve, reject) => {
        if (user.info.email !== 'vol@vol.com') {
            mailsender.sendMail(usermail, (err, info) => {
                if (err) {
                    console.log(err);
                    reject(err);
                }
                else {
                    resolve(info);
                }
            });
        } else {
            resolve();
        }
    });
};

module.exports.sendApplicationMail = function(user, need, applicant) {
    let usermail = email;

    usermail.to.push(user.info.email);
    usermail.html = userHtmlModel.preTitle + '"' + need.title + '"' + userHtmlModel.postTitle + userHtmlModel.body;

    usermail.to.push(user.info.email);

    return new Promise((resolve, reject) => {
        if (user.info.email !== 'org@org.com') {
            mailsender.sendMail(usermail, (err, info) => {
                if (err) {
                    reject(err);
                }
                else {
                    resolve(info);
                }
            });
        } else {
                resolve();
            }
    });
};
