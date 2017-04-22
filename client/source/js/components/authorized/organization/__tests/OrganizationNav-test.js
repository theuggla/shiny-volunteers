/**
 * Test for the OrganizationNav component.
 */

import React from 'react';
import { shallow } from 'enzyme';

import {BottomNavigationItem} from 'material-ui/BottomNavigation';

import OrganizationNav from '../OrganizationNav.jsx';

describe("OrganizationNav Component", () => {
    const historyMock= [];
    const matchMock = {
        path: '/organization'
    };

    const wrapper = shallow(<OrganizationNav
        match={matchMock}
        history={historyMock}
    />);


    describe("Basic render", () => {

        it("should mount", (done) => {
            expect(wrapper.find('.organization-nav').length).to.equal(1);
            done();
        });

        it("should render three BottomNav-items", (done) => {
            expect(wrapper.find(BottomNavigationItem)).to.have.length(2);
            done();
        });
    });

    describe("Visually", () => {

        it("should select the clicked BottomNavigationItem", (done) => {
            wrapper.find('[label="needs"]').simulate('touchTap');
            expect(wrapper.state('selectedIndex')).to.equal(0);
            wrapper.find('[label="add need"]').simulate('touchTap');
            expect(wrapper.state('selectedIndex')).to.equal(1);
            done();
        });

    });

    describe("Functionally", () => {
        it("should route between pages on click", (done) => {
            wrapper.find('[label="needs"]').simulate('touchTap');
            expect(historyMock[historyMock.length -1]).to.equal('/organization/needs');
            wrapper.find('[label="add need"]').simulate('touchTap');
            expect(historyMock[historyMock.length -1]).to.equal('/organization/needs/add');
            done();
        });
    });

});
