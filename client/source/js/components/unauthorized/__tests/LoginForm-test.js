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
    const errors = {};
    const allowFacebook = true;
    const user = {};
    const onSubmit = sinon.spy();

    const wrapper = shallow(<LoginForm
        onChange = {onChange}
        errors = {errors}
        allowFacebook = {allowFacebook}
        user = {user}
        onSubmit = {onSubmit}
    />);




    describe("Basic render", () => {

        it("should mount", (done) => {
            expect(wrapper.find('.login-form').length).to.equal(1);
            done();
        });

        it("should contain text", (done) => {
            expect(wrapper.contains(<h2>Login</h2>)).to.equal(true);
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
        it("should call the onSubmitFunction on submit", () => {
            wrapper.find('form').simulate('submit');
            expect(onSubmit.calledOnce).to.equal(true);
        });

        it("should call the onChange Function on change to the TextFields", () => {
            wrapper.find('[name="email"]').simulate('change');
            expect(onChange.calledOnce).to.equal(true);
        });
    });

});
