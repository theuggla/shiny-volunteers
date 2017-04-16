/**
 * Tests for the Organization Container.
 */

import React from 'react';
import { shallow } from 'enzyme';

import OrganizationContainer from '../OrganizationContainer.jsx';
import OrganizationNav from '../../../../components/authorized/organization/OrganizationNav.jsx';
import auth from '../../../../modules/Auth';
import { MemoryRouter } from 'react-router';



describe("Organization Container", () => {
    const historyMock= [];
    const matchMock = {
        path: '/organization'
    };

    describe("authorized user", () => {
        auth.authenticateUser('test-token', ['organization']);

        const wrapper = shallow(
            <OrganizationContainer
                routes={[{authorize: ['organization']}]}
                match = {matchMock}
                history = {historyMock}
            />, {context: {router: <MemoryRouter />}});

        describe("Basic render", () => {

            it("should mount", (done) => {
                expect(wrapper.find('.organization-app').length).to.equal(1);
                done();
            });

            it("should render the OrganizationNav", (done) => {
                expect(wrapper.find(OrganizationNav).length).to.equal(1);
                done();
            });
        });

        describe("unauthorized user", () => {
            auth.deauthenticateUser();
            auth.authenticateUser('test-token', ['volunteer']);

            const wrapper = shallow(
                <OrganizationContainer
                    routes={[{authorize: ['organization']}]}
                    match={matchMock}
                    history={historyMock}
                />, {context: {router: <MemoryRouter />}});

            describe("Basic render", () => {

                it("should mount", (done) => {
                    expect(wrapper.find('.organization-app').length).to.equal(1);
                    done();
                });

                it("should redirect to start", (done) => {
                    expect(historyMock[historyMock.length - 1]).to.equal('/');
                    done();
                });

            });
        });
    });
});
