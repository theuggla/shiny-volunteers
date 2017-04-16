
/**
 * Tests for the Volunteer Container.
 */

import React from 'react';
import { shallow } from 'enzyme';

import VolunteerContainer from '../VolunteerContainer.jsx';
import VolunteerNav from '../../../../components/authorized/volunteer/VolunteerNav.jsx';
import auth from '../../../../modules/Auth';
import { MemoryRouter } from 'react-router';



describe("Volunteer Container", () => {
    const historyMock= [];
    const matchMock = {
        path: '/volunteer'
    };

    describe("authorized user", () => {
        auth.authenticateUser('test-token', ['volunteer']);

        const wrapper = shallow(
            <VolunteerContainer
                routes={[{authorize: ['volunteer']}]}
                match = {matchMock}
                history = {historyMock}
            />, {context: {router: <MemoryRouter />}});

        describe("basic render", () => {

            it("should mount", (done) => {
                expect(wrapper.find('.volunteer-app').length).to.equal(1);
                done();
            });

            it("should render the VolunteerNav", (done) => {
                expect(wrapper.find(VolunteerNav).length).to.equal(1);
                done();
            });
        });

        describe("unauthorized user", () => {
            auth.deauthenticateUser();
            auth.authenticateUser('test-token', ['organization']);

            const wrapper = shallow(
                <VolunteerContainer
                    routes={[{authorize: ['volunteer']}]}
                    match={matchMock}
                    history={historyMock}
                />, {context: {router: <MemoryRouter />}});

            describe("basic render", () => {

                it("should mount", (done) => {
                    expect(wrapper.find('.volunteer-app').length).to.equal(1);
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
