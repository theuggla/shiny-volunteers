/**
 * Container-component that wraps the login form.
 * Will render the form and pass down state as props.
 */

// Imports -------------------------------------------------------------------------------------------------------------
import React from 'react';
import axios from 'axios';

import auth from '../../modules/Auth';

import LoginForm from '../../components/unauthorized/LoginForm.jsx';

// Class --------------------------------------------------------------------------------------------------------------

/**
 * Container that controls the state of the Login Form
 * And sends the data to the server.
 * Renders a loading symbol or the form.
 */
class LoginPage extends React.Component {
    /**
     * Passes on props, binds methods and sets initial state.
     * @param props {Object} will be passed on.
     */
    constructor(props) {
        super(props);

        this.state = {
            errors: {},
            user: {
                email: '',
                password: '',
                passwordConfirm: ''
            },
            popup: false,
            popupAction: "",
            popupMessage: 'message has not been changed even though it should',
            signup: false
        };

        this.processLoginForm = this.processLoginForm.bind(this);
        this.processSignupForm = this.processSignupForm.bind(this);
        this.changeUser = this.changeUser.bind(this);
        this.changeToSignup = this.changeToSignup.bind(this);
        this.facebookLogin = this.facebookLogin.bind(this);
    }

    /**
     * Controls state of the login-form components.
     * Resets any errors on change.
     * @param event {Object} The event that fires when a component is changed.
     */
    changeUser(event) {
        this.setState({
            errors: {}
        });

        const field = event.target.name;
        const user = this.state.user;
        user[field] = event.target.value;

        this.setState({
            user: user
        });
    }

    /**
     * Sets the form's state to a signup-form.
     * @param event {Object} The event that fires when a user confirms signup.
     */
    changeToSignup(event) {
        this.setState({signup: true, popup: false});
    }

    /**
     * Sends the add login form-data to the server.
     * Redirects the user if successful in logging in.
     * Sets error state if something goes wrong.
     * Or sets signup-popup to true of the user does not exist.
     * @param event {Object} The event that fires when the form is submitted.
     */
    processLoginForm(event) {
        return new Promise((resolve, reject) => {
            event.preventDefault();

            axios.post('/login/local', {
                email: this.state.user.email,
                password: this.state.user.password,
                role: this.props.match.params.role
            })
                .then((response) => {
                    this.setState({
                        errors: {}
                    });

                    auth.authenticateUser(response.data.token, response.data.user.roles, response.data.user);
                    if (this) this.props.history.push('/' + response.data.user.roles[0]);
                    resolve();
                })
                .catch((error) => {
                    if (error.response && error.response.status === 404) {
                        this.setState({popup: true, popupAction: "sign up", popupMessage: error.response.data.summary + ' Sign up user?'});
                    } else {
                        const errors = error.response ? error.response.data.errors ? error.response.data.errors : error.response.data : {summary: 'you seem to be offline'};
                        this.setState({
                            errors: errors
                        });
                    }
                    resolve();
                });
        });
    }

    /**
     * Sends the add login form-data to the server if the passwords match.
     * Sets a popup-state to true asking the user to confirm the registration via email.
     * @param event {Object} The event that fires when the form is submitted.
     */
    processSignupForm(event) {
        return new Promise((resolve, reject) => {
            event.preventDefault();

            if (!(this.state.user.password === this.state.user.passwordConfirm)) {
                let errors = {
                    password: 'passwords does not match',
                    passwordConfirm: 'passwords does not match',
                    summary: 'retype your passwords'
                };
                this.setState({errors: errors});

                resolve();

            } else {
                axios.post('/login/local/signup', {
                    email: this.state.user.email,
                    password: this.state.user.password,
                    role: this.props.match.params.role
                })
                    .then((response) => {
                        this.setState({
                            errors: {},
                            popup: true,
                            popupAction: "",
                            popupMessage: response.data.summary,
                            signup: false
                        });

                        resolve();
                    })
                    .catch((error) => {
                        const errors = error.response ? error.response.data.errors ? error.response.data.errors : error.response.data : {summary: 'you seem to be offline'};
                        this.setState({
                            errors: errors
                        });

                        resolve();
                    });
            }
        });
    }

    /**
     * Handles the facebook login when a response is received from facebook.
     * Redirects the user to the proper authorized pages, and remembers the authenticated user.
     * @param response
     */
    facebookLogin(response) {
        console.log('in facebook login');
        console.log(response);
        if (response.name) {
            axios.post('/login/facebook', response)
                .then((response) => {
                    this.setState({
                        errors: {}
                    });
                    auth.authenticateUser(response.data.token, response.data.user.roles);
                    console.log('response from server');
                    console.log(response);
                    console.log('pushing history');
                    this.props.history.push('/' + response.data.user.roles[0]);
                })
                .catch((error) => {
                    const errors = error.response ? error.response.data.errors ? error.response.data.errors : error.response.data : {summary: 'you seem to be offline'};
                    this.setState({
                        errors: errors
                    });
                });
        }
    }

    /**
     * @returns {Component} a LoginForm
     */
    render() {
        return (
            <LoginForm className="login-page"
                onSubmit={this.processLoginForm}
                processSignup={this.processSignupForm}
                onChange={this.changeUser}
                onFacebookLogin={this.facebookLogin}
                errors={this.state.errors}
                user={this.state.user}
                allowFacebook = {this.props.match.params.role === 'volunteer'}
                signup={this.state.signup}
                popup={this.state.popup}
                popupMessage={this.state.popupMessage}
                onPopupConfirm={this.changeToSignup}
                popupAction={this.state.popupAction}
            />
        );
    }

}


// Exports ------------------------------------------------------------------------------------------------------------
export default LoginPage;
