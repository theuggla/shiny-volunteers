
/**
 * Tests for the LoginPage.
 */

import React from 'react';
import { shallow , mount} from 'enzyme';
import sinon from 'sinon';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
const muiTheme = getMuiTheme();

require('mocha-steps');

import LoginPage from '../LoginPage.jsx';
import LoginForm from '../../../components/unauthorized/LoginForm.jsx';


let axios = require('axios');
let MockAdapter = require('axios-mock-adapter');

let mock = new MockAdapter(axios);

mock.onPost('/login/local').reply(function(config) {
    return new Promise((resolve, reject) => {
        resolve([500, { errors: {summary: 'something went wrong'}}]);
    });
});


describe("LoginPage", () => {
    const matchMock = {params: {path: '/login'}};
    const historyMock = [];
    const wrapper = mount(
        <LoginPage match={matchMock} history={historyMock} />, {
        context: {
            muiTheme
        },
        childContextTypes: {muiTheme: React.PropTypes.object}
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

    describe("Login", () => {
        step("Fill in email and password", function(done) {
            const emailInput = wrapper.find("[name='email']");
            const passwordInput = wrapper.find("[name='password']");
            emailInput.simulate("change", {target: {name: 'email', value: "test@test.com"}});
            passwordInput.simulate("change", {target: {name: 'password', value: "test"}});
            done();
        });

        step("it should set the new user state", function(done) {
            expect(wrapper.state('user').password).to.equal("test");
            expect(wrapper.state('user').email).to.equal("test@test.com");
            done();
        });

        step("Submit the form", function(done) {
            const form = wrapper.find(".login-form");
            form.simulate("submit");
            setTimeout(done, 1000);
        });

        step("Error message", function(done) {
            const errorMessage = wrapper.find('.error-message');
            expect(errorMessage.exists()).to.equal(true);
            done();
        });
    });
});
