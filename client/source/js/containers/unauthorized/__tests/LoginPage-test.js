
/**
 * Tests for the LoginPage.
 */

import React from 'react';
import { shallow } from 'enzyme';

import LoginPage from '../LoginPage.jsx';
import LoginForm from '../../../components/unauthorized/LoginForm.jsx';



describe("LoginPage", () => {
    const matchMock = {params: {path: '/login'}};
    const historyMock = [];
    const wrapper = shallow(
        <LoginPage match={matchMock} history={historyMock} />);

    describe("Basic render", () => {

        it("should mount", (done) => {
            expect(wrapper.find('.login-page').length).to.equal(1);
            done();
        });

        it("should render a LoginForm", (done) => {
            expect(wrapper.find(LoginForm).length).to.equal(1);
            done();
        });
    });
});
