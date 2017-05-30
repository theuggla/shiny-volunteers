/**
 * Tests for the LoginPage.
 */

import React from 'react';
import { shallow , mount} from 'enzyme';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

import LoginPage from '../LoginPage.jsx';
import LoginForm from '../../../components/unauthorized/LoginForm.jsx';

require('mocha-steps');

let axios = require('axios');
let MockAdapter = require('axios-mock-adapter');

let mock = new MockAdapter(axios);
const muiTheme = getMuiTheme();

mock.onPost('/login/local').reply(function(config) {
    let data = JSON.parse(config.data);
    let email = data.email;
    let password = data.password;
    let volunteer = data.role === 'volunteer';

    let correctPass = false;
    let registred = true;
    let correctRole = true;

    let volunteerUser = {
        token: 'testtoken',
        user: {
            roles: ['volunteer'],
            complete: false
        }
    };

    let errorResponse = {
        errors: {
            summary: 'wrong password'
        }
    };

    return new Promise((resolve, reject) => {
        switch (password) {
            case 'correct':
                correctPass = true;
                break;
            case 'incorrect':
                correctPass = false;
                break;
        }

        switch (email) {
            case 'org@test.com':
                debugger;
                registred = true;
                correctRole = !volunteer;
                break;
            case 'vol@test.com':
                registred = true;
                correctRole = volunteer;
                break;
            case 'correct@test.com':
                registred = true;
                break;
            case 'incorrect@test.com':
                registred = false;
                break;
        }

        if (registred && correctPass && correctRole) {
            resolve([200, volunteerUser]);
        } else if (registred && !correctPass) {
            resolve([400, errorResponse]);
        } else if (!correctRole) {
            errorResponse.errors.summary = 'wrong role';
            resolve([400, errorResponse]);
        } else if (!registred) {
            errorResponse.errors.summary = 'user not in system';
            resolve([404, errorResponse]);
        }
    });
});

mock.onPost('/login/local/signup').reply(function(config) {
    return new Promise ((resolve, reject) => {
        resolve([200, {summary: 'success'}]);
    });
});


describe("LoginPage", () => {
    const matchMockVolunteer = {params: {path: '/login', role: 'volunteer'}};
    let historyMock = [];

    const wrapper = mount(
        <LoginPage match={matchMockVolunteer} history={historyMock} />, {
            context: {
                muiTheme
            },
            childContextTypes: {muiTheme: React.PropTypes.object}
        });

    beforeEach("reset history", () => {
        historyMock = [];
        wrapper.setProps({history: historyMock});
    });

    describe("Basic render", () => {

        it("should mount", (done) => {
            expect(wrapper.find('.login-form').length).to.equal(1);
            done();
        });

        it("should render a LoginForm", (done) => {
            expect(wrapper.find(LoginForm).length).to.equal(1);
            done();
        });
    });

    describe("Login with correct credentials", () => {
        step("Fill in email and password", function(done) {
            const emailInput = wrapper.find("[name='email']");
            const passwordInput = wrapper.find("[name='password']");
            emailInput.simulate("change", {target: {name: 'email', value: "correct@test.com"}});
            passwordInput.simulate("change", {target: {name: 'password', value: "correct"}});
            done();
        });

        step("it should set the new user state", function(done) {
            expect(wrapper.state('user').email).to.equal("correct@test.com");
            expect(wrapper.state('user').password).to.equal("correct");
            done();
        });

        step("Submit the form", function(done) {
            let event = {preventDefault: function(){}};
            const form = wrapper.find(".login-form");

            form.props().onSubmit(event).then(done());
        });

        step("Do not display error message", function(done) {
            const errorMessage = wrapper.find('.error-message');
            expect(errorMessage.exists()).to.equal(false);
            done();
        });
    });

    describe("Login with wrong password", () => {
        step("Fill in email and password", function(done) {
            const emailInput = wrapper.find("[name='email']");
            const passwordInput = wrapper.find("[name='password']");
            emailInput.simulate("change", {target: {name: 'email', value: "correct@test.com"}});
            passwordInput.simulate("change", {target: {name: 'password', value: "incorrect"}});
            done();
        });

        step("Submit the form", function(done) {
            let event = {preventDefault: function(){}};
            const form = wrapper.find(".login-form");

            form.props().onSubmit(event).then(done());
        });

        step("Do not redirect", function(done) {
            expect(historyMock.length).to.equal(0);
            done();
        });
    });

    describe("Login as organization with email that belongs to volunteer", () => {
        wrapper.setProps({match: {params: {role: 'organization'}}});

        step("Fill in email and password", function(done) {
            const emailInput = wrapper.find("[name='email']");
            const passwordInput = wrapper.find("[name='password']");
            emailInput.simulate("change", {target: {name: 'email', value: "vol@test.com"}});
            passwordInput.simulate("change", {target: {name: 'password', value: "correct"}});
            done();
        });

        step("Submit the form", function(done) {
            let event = {preventDefault: function(){}};

            const form = wrapper.find(".login-form");
            form.props().onSubmit(event).then(done());
        });
    });

    describe("Login with email that is not in system, refuse signup", () => {
        step("Fill in email and password", function(done) {
            const emailInput = wrapper.find("[name='email']");
            const passwordInput = wrapper.find("[name='password']");
            emailInput.simulate("change", {target: {name: 'email', value: "incorrect@test.com"}});
            passwordInput.simulate("change", {target: {name: 'password', value: "correct"}});
            done();
        });

        step("Submit the form", function(done) {
            let event = {preventDefault: function(){}};
            const form = wrapper.find(".login-form");

            form.props().onSubmit(event).then(done());
        });

        step("No error message", function(done) {
            const errorMessage = wrapper.find('.error-message');
            expect(errorMessage.exists()).to.equal(false);
            done();
        });

        step("Find popup", function(done) {
            const popup = wrapper.find('.popup');
            expect(popup.exists()).to.equal(true);
            done();
        });
    });

    describe("Login with email that is not in system, accept signup, passwords does not match", () => {
        step("Fill in email and password", function(done) {
            const emailInput = wrapper.find("[name='email']");
            const passwordInput = wrapper.find("[name='password']");
            emailInput.simulate("change", {target: {name: 'email', value: "incorrect@test.com"}});
            passwordInput.simulate("change", {target: {name: 'password', value: "correct"}});
            done();
        });

        step("Submit the form", function(done) {
            let event = {preventDefault: function(){}};
            const form = wrapper.find(".login-form");

            form.props().onSubmit(event).then(done());
        });

        step("No error message", function(done) {
            const errorMessage = wrapper.find('.error-message');
            expect(errorMessage.exists()).to.equal(false);
            done();
        });

        step("Find popup", function(done) {
            const popup = wrapper.find('.popup');
            expect(popup.exists()).to.equal(true);
            done();
        });

        step("Accept signup", function(done) {
            wrapper.setState({signup: true});
            done();
        });

        step("Fill in confirmed password", function(done) {
            wrapper.setState({signup: true});
            const confirmPasswordInput = wrapper.find("[name='passwordConfirm']");
            confirmPasswordInput.simulate("change", {target: {name: 'passwordConfirm', value: "incorrect"}});
            done();
        });

        step("Submit the form", function(done) {
            wrapper.setState({signup: true});

            let event = {preventDefault: function(){}};
            const form = wrapper.find(".login-form");

            form.prop('onSubmit')(event).then(() => {
                const errorMessage = wrapper.find('.error-message');

                expect(errorMessage.exists()).to.equal(true);

                expect(errorMessage.text()).to.equal('retype your passwords');
                done();
            });
        });
    });

    describe("Login with email that is not in system, accept signup, passwords match", () => {

        step("Fill in email and password", function(done) {
            const emailInput = wrapper.find("[name='email']");
            const passwordInput = wrapper.find("[name='password']");
            emailInput.simulate("change", {target: {name: 'email', value: "incorrect@test.com"}});
            passwordInput.simulate("change", {target: {name: 'password', value: "correct"}});
            done();
        });

        step("Submit the form", function(done) {
            let event = {preventDefault: function(){}};
            const form = wrapper.find(".login-form");

            form.props().onSubmit(event).then(done());
        });

        step("Find popup", function(done) {
            const popup = wrapper.find('.popup');
            expect(popup.exists()).to.equal(true);
            done();
        });

        step("Accept signup", function(done) {
            wrapper.setState({signup: true});
            done();
        });

        step("Fill in confirmed password", function(done) {
            wrapper.setState({signup: true});
            const confirmPasswordInput = wrapper.find("[name='passwordConfirm']");
            confirmPasswordInput.simulate("change", {target: {name: 'passwordConfirm', value: "correct"}});
            done();
        });
    });

});
