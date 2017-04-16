/**
 * Test for the VolunteerNav component.
 */

import React from 'react';
import { shallow } from 'enzyme';

import {BottomNavigationItem} from 'material-ui/BottomNavigation';

import VolunteerNav from '../VolunteerNav.jsx';

describe("VolunteernNav Component", () => {
    const historyMock= [];
    const matchMock = {
        path: '/volunteer'
    };

    const wrapper = shallow(<VolunteerNav
        match={matchMock}
        history={historyMock}
    />);


    describe("Basic render", () => {

        it("should mount", (done) => {
            expect(wrapper.find('.volunteer-nav').length).to.equal(1);
            done();
        });

        it("should render three BottomNav-items", (done) => {
            expect(wrapper.find(BottomNavigationItem)).to.have.length(3);
            done();
        });
    });

    describe("Visually", () => {

        it("should select the clicked BottomNavigationItem", (done) => {
            wrapper.find('[label="matches"]').simulate('touchTap');
            expect(wrapper.state('selectedIndex')).to.equal(0);
            wrapper.find('[label="applications"]').simulate('touchTap');
            expect(wrapper.state('selectedIndex')).to.equal(1);
            wrapper.find('[label="profile"]').simulate('touchTap');
            expect(wrapper.state('selectedIndex')).to.equal(2);
            done();
        });

    });

    describe("Functionally", () => {
        it("should route between pages on click", (done) => {
            wrapper.find('[label="matches"]').simulate('touchTap');
            expect(historyMock[historyMock.length -1]).to.equal('/volunteer/matches');
            wrapper.find('[label="applications"]').simulate('touchTap');
            expect(historyMock[historyMock.length -1]).to.equal('/volunteer/applications');
            wrapper.find('[label="profile"]').simulate('touchTap');
            expect(historyMock[historyMock.length -1]).to.equal('/volunteer/profile');
            done();
        });
    });

});
