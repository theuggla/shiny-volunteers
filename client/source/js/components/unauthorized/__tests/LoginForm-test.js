/**
 * Test for the LoginForm component.
 */

import React from 'react';
import { shallow } from 'enzyme';
import sinon from 'sinon';

import LoginForm from '../LoginForm.jsx';
import RaisedButton from 'material-ui/RaisedButton';
import FacebookButton from 'react-facebook-login';
import TextField from 'material-ui/TextField';

describe("LoginForm Component", () => {
    const onChange = sinon.spy();
    const onSubmit = sinon.spy();
    const processSignup = sinon.spy();
    const onPopupConfirm =sinon.spy();
    const allowFacebook = true;
    const signup = false;
    const popup = false;
    const popupAction = "test-action";
    const popupMessage = "test";
    const errors = {};
    const user = {};

    const wrapper = shallow(<LoginForm
        onChange = {onChange}
        onSubmit = {onSubmit}
        processSignup = {processSignup}
        onPopupConfirm = {onPopupConfirm}
        popupAction = {popupAction}
        allowFacebook = {allowFacebook}
        signup={signup}
        popup={popup}
        popupMessage={popupMessage}
        errors = {errors}
        user = {user}
    />);

    describe("Basic render", () => {

        it("should mount", (done) => {
            expect(wrapper.find('.login-form').length).to.equal(1);
            done();
        });

        it("should render two text fields", (done) => {
            expect(wrapper.find(TextField)).to.have.length(2);
            done();
        });
    });

    describe("Visually", () => {

        it("should render two buttons for volunteers", (done) => {
            expect(wrapper.find(RaisedButton)).to.have.length(1);
            expect(wrapper.find(FacebookButton)).to.have.length(1);
            done();
        });

        it("should render one button for organizations", (done) => {
            wrapper.setProps({allowFacebook: false});
            expect(wrapper.find(RaisedButton)).to.have.length(1);
            expect(wrapper.find(FacebookButton)).to.have.length(0);
            done();
        });

        it("should render a password confirm-field on set to signup", (done) => {
            wrapper.setProps({signup: true});
            expect(wrapper.find(RaisedButton)).to.have.length(1);
            expect(wrapper.find(FacebookButton)).to.have.length(0);
            done();
        });

        it("should display a popup when prompted", (done) => {
            wrapper.setProps({popup: true});
            expect(wrapper.find('.popup')).to.have.length(1);
            done();
        });

        it("should display an error message if an error message is supplied", (done) => {
            expect(wrapper.find('.error-message')).to.have.length(0);
            wrapper.setProps({errors: {
                summary: 'testing the error message'
            }});
            expect(wrapper.find('.error-message')).to.have.length(1);
            done();
        });

    });

    describe("Functionally", () => {
        it("should call the onSubmit Function on submit", () => {
            wrapper.setProps({signup: false});
            wrapper.find('form').simulate('submit');
            expect(onSubmit.callCount).to.equal(1);
        });

        it("should call the onChange Function on change to the TextFields", () => {
            wrapper.find('[name="email"]').simulate('change');
            expect(onChange.calledOnce).to.equal(true);
        });

        it("should call the processSignup Function on signup-submit", () => {
            wrapper.setProps({signup: true});
            wrapper.find('form').simulate('submit');
            expect(processSignup.callCount).to.equal(1);
        });

        it("should not call the onSubmit Function on signup-submit", () => {
            onSubmit.reset();
            wrapper.setProps({signup: true});
            wrapper.find('form').simulate('submit');
            expect(onSubmit.callCount).to.equal(0);
        });
    });

});
