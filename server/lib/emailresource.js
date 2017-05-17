/**
 * Module to handle the email sending.
 */

// Requires -----------------------------------------------------------------------------------------------------------
let helper = require('sendgrid').mail;
let fromEmail = new helper.Email('do-not-reply@sparktherevolution.com');
let sg = require('sendgrid')(process.env.SENDGRID_API_KEY);


// Mail functions -----------------------------------------------------------------------------------------------------

/**
 * Sends a email to the user to confirm an application.
 *
 * @param user {Object} the user to send the email to.
 * @param need {Object} the need the user applied to.
 * @returns {Promise} a Promise that resolves with the confirmation
 * of the sent email or rejects with an error.
 */
module.exports.sendMailToUser = function(user, need) {
    let toEmail = new helper.Email(user.profile.email);
    let subject = 'Thanks for your application!';
    let content = new helper.Content('text/plain', 'We have  forwarded your application regarding the ' + need.title + ' to the concerned organization together with your profile, and they will be in touch as soon as possible.');
    let mail = new helper.Mail(fromEmail, subject, toEmail, content);

    let request = sg.emptyRequest({
        method: 'POST',
        path: '/v3/mail/send',
        body: mail.toJSON()
    });

    return new Promise((resolve, reject) => {
        if (user.info.email !== 'vol@vol.com') {
            sg.API(request, (error, response) => {
                if (error) {
                    reject(error);
                }
                resolve(response);
            });
        }
    });
};

/**
 * Sends a email to the organization to confirm an application for a need.
 *
 * @param user {Object} the organization to send the email to.
 * @param need {Object} the need the user applied to.
 * @param applicant {Object} the user that applied.
 * @returns {Promise} a Promise that resolves with the confirmation
 * of the sent email or rejects with an error.
 */
module.exports.sendApplicationMail = function(user, need, applicant) {
    let toEmail = new helper.Email(user.info.email);
    let subject = 'Someone wants to help you!';
    let content = new helper.Content('text/plain', 'You have recieved an application for the ' + need.title + ' from the following user: \n' + JSON.stringify(applicant.profile) + ' \n Please contact them on ' + applicant.info.email + ' as soon as possible. Cheers!');
    let mail = new helper.Mail(fromEmail, subject, toEmail, content);

    let request = sg.emptyRequest({
        method: 'POST',
        path: '/v3/mail/send',
        body: mail.toJSON()
    });

    return new Promise((resolve, reject) => {
        if (user.info.email !== 'org@org.com') {
            sg.API(request, (error, response) => {
                if (error) {
                    reject(error);
                }
                resolve(response);
            });
        }
    });
};
