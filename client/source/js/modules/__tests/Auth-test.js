/**
 * Tests for the Auth module.
 */

const Auth = require('./../Auth');
let Cookies = require('js-cookie');

describe('Auth.js', () => {
    const TOKEN = 'test-token';
    const ROLES = ['volunteer'];


    beforeEach('remove authentication', () => {
        Cookies.remove('currentUser');
    });


    describe('AuthenticatateUser', () => {
        beforeEach('remove authentication', () => {
            Cookies.remove('currentUser');
        });

        it('Should set a cookie to an object containing roles and a token', (done) => {
            Auth.authenticateUser(TOKEN, ROLES);
            expect(JSON.parse(Cookies.get('currentUser')).token).to.equal(TOKEN);
            expect(JSON.parse(Cookies.get('currentUser')).roles).to.deep.equal(ROLES);
            done();
        });

        it('Should transform the roles into an array', (done) => {
            Auth.authenticateUser('test-token', 'volunteer');
            expect(JSON.parse(Cookies.get('currentUser')).roles).to.deep.equal(ROLES);
            done();
        });

        it('Should throw an error if the roles are not strings', (done) => {
            expect(() => {
                Auth.authenticateUser(TOKEN, [{}]);
            }).to.throw(Error);
            done();
        });

    });

    describe('isUserAuthenticated', () => {

        beforeEach('remove authentication', () => {
            Cookies.remove('currentUser');
        });

        it('should return false when user is not authenticated', (done) => {
            expect(Auth.isUserAuthenticated()).to.equal(false);
            done();
        });

        it('should return true when user is authenticated', (done) => {
            Auth.authenticateUser(TOKEN, ROLES);
            expect(Auth.isUserAuthenticated()).to.equal(true);
            done();
        });

    });

    describe('deauthenticateUser', () => {

        beforeEach('remove authentication', () => {
            Cookies.remove('currentUser');
        });

        it('should remove the user\'s authentication', (done) => {
            Auth.authenticateUser(TOKEN, ROLES);
            expect(Auth.isUserAuthenticated()).to.equal(true);
            Auth.deauthenticateUser();
            expect(Auth.isUserAuthenticated()).to.equal(false);
            done();
        });

    });

    describe('getToken', () => {

        beforeEach('remove authentication', () => {
            Cookies.remove('currentUser');
        });

        it('should return the user\'s token', (done) => {
            Auth.authenticateUser(TOKEN, ROLES);
            expect(Auth.getToken()).to.equal(TOKEN);
            done();
        });

    });

    describe('getAuthRoles', () => {

        beforeEach('remove authentication', () => {
            Cookies.remove('currentUser');
        });

        it('should return the authorized roles', (done) => {
            Auth.authenticateUser(TOKEN, ROLES);
            expect(Auth.getAuthRoles()).to.deep.equal(ROLES);
            done();
        });

    });

});

