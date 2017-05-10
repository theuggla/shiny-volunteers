/**
 * Module to provide client-side cookie-bases authorization.
 */

// Imports ------------------------------------------------------------------------------------------------------------
import Cookies from 'js-cookie';

// Class --------------------------------------------------------------------------------------------------------------
class Auth {
    /**
     * Save an authenticated user in a cookie.
     * @param {string} token the users JWT token
     * @param {[string]} roles an array of roles the user is authenticated as
     */
    static authenticateUser(token, roles) {
        if (!Array.isArray(roles)) {
            roles = [roles];
        }

        roles.forEach((role) => {
            if (typeof role !== 'string') {
                throw new Error('Roles myst be an array of strings.');
            }
        });

        Cookies.set('currentUser', {token: token, roles: roles}, {expires: 30});
    }

    /**
     * Check if a current user is saved.
     * @returns {boolean} true if the user is authenticated.
     */
    static isUserAuthenticated() {
        return Cookies.get('currentUser') !== undefined;
    }

    /**
     * Remove the current users cookie session.
     */
    static deauthenticateUser() {
        Cookies.remove('currentUser');

        return true;
    }

    /**
     * Get a token value from a cookie.
     * @returns {string} the token
     */
    static getToken() {
        if (Auth.isUserAuthenticated()) {
            return JSON.parse(Cookies.get('currentUser')).token;
        } else {
            return undefined;
        }
    }

    /**
     * Get the roles the current user is authenticated as.
     * @returns {[string]} the roles
     */
    static getAuthRoles() {
        if (Auth.isUserAuthenticated()) {
            return JSON.parse(Cookies.get('currentUser')).roles;
        } else {
            return [];
        }
    }

}

// Exports ------------------------------------------------------------------------------------------------------------
module.exports = Auth;
