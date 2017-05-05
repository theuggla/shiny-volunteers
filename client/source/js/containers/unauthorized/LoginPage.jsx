import React from 'react';
import axios from 'axios';

import LoginForm from '../../components/unauthorized/LoginForm.jsx';
import auth from '../../modules/Auth';

class LoginPage extends React.Component {

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

    changeToSignup(event) {
        this.setState({signup: true, popup: false});
    }

    processLoginForm(event) {
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

                auth.authenticateUser(response.data.token, response.data.user.roles, response.data.user.complete);

                this.props.history.push('/' + response.data.user.roles[0]);
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
            });
    }

    processSignupForm(event) {
        event.preventDefault();

        if (!(this.state.user.password === this.state.user.passwordConfirm)) {
            let errors = {
                password: 'passwords does not match',
                passwordConfirm: 'passwords does not match',
                summary: 'retype your passwords'
            };
            this.setState({errors: errors})
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
                })
                .catch((error) => {
                    const errors = error.response ? error.response.data.errors ? error.response.data.errors : error.response.data : {summary: 'you seem to be offline'};
                    this.setState({
                        errors: errors
                    });
                });
        }
    }

    facebookLogin(response) {
        if (response.name) {
            axios.post('/login/facebook', response)
                .then((response) => {
                    this.setState({
                        errors: {}
                    });
                    auth.authenticateUser(response.data.token, response.data.user.roles);
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


//Exports.
export default LoginPage;
