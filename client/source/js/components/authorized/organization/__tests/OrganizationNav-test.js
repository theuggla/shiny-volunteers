/**
 * Test for the OrganizationNav component.
 */


import React from 'react';
import { mount } from 'enzyme';

import getMuiTheme from 'material-ui/styles/getMuiTheme'
import {BottomNavigationItem} from 'material-ui/BottomNavigation';

import OrganizationNav from '../OrganizationNav.jsx';

const muiTheme = getMuiTheme();

describe("OrganizationNav Component", () => {
    const historyMock= {location: '/needs'};
    const matchMock = {
        path: '/organization'
    };

    const wrapper = mount(<OrganizationNav
        match={matchMock}
        history={historyMock}
    />, {
        context: {
            muiTheme
        },
        childContextTypes: {muiTheme: React.PropTypes.object}
    });


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

});

