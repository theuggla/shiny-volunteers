/**
 * Test for the VolunteerNav component.
 */


import React from 'react';
import { mount } from 'enzyme';

import getMuiTheme from 'material-ui/styles/getMuiTheme'
import {BottomNavigationItem} from 'material-ui/BottomNavigation';

import VolunteerNav from '../VolunteerNav.jsx';

const muiTheme = getMuiTheme();

describe("VolunteernNav Component", () => {
    const historyMock= {location: '/matches'};
    const matchMock = {
        path: '/volunteer'
    };

    const wrapper = mount(<VolunteerNav
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
            expect(wrapper.find('.volunteer-nav').length).to.equal(1);
            done();
        });

        it("should render three BottomNav-items", (done) => {
            expect(wrapper.find(BottomNavigationItem)).to.have.length(3);
            done();
        });
    });

});
