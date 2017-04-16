/**
 * Test for the Welcome component.
 */

import React from 'react';
import { shallow } from 'enzyme';

import Welcome from '../Welcome.jsx';
import FlatButton from 'material-ui/FlatButton';

describe("Welcome Component", () => {
    const historyMock = [];
    const wrapper = shallow(<Welcome history={historyMock} />);

        it("should mount", (done) => {
            expect(wrapper.find('.welcome').length).to.equal(1);
            done();
        });

        it("should contain text", (done) => {
            expect(wrapper.contains(<h3>spark the revolution</h3>)).to.equal(true);
            done();
        });

        it("should render two buttons", (done) => {
            expect(wrapper.find(FlatButton)).to.have.length(2);
            done();
        });

        it("should go to the volunteer login when clicked", (done) => {
            wrapper.find('[label="volunteer"]').simulate('touchTap');
            expect(historyMock[historyMock.length-1]).to.equal('/login/volunteer');
            done();
        });

    it("should go to the organization login when clicked", (done) => {
        wrapper.find('[label="find volunteers"]').simulate('touchTap');
        expect(historyMock[historyMock.length-1]).to.equal('/login/organization');
        done();
    });


});
