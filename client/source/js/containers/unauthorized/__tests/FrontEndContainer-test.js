
/**
 * Tests for the Front End-Container.
 */

import React from 'react';
import { shallow, mount } from 'enzyme';

import FrontEndContainer from '../FrontEndContainer.jsx';
import { Link } from 'react-router-dom'
import { MemoryRouter } from 'react-router';



describe("FrontEndContainer", () => {
    const historyMock= [];
    const matchMock = {
        path: '/organization'
    };

    const wrapper = shallow(
        <FrontEndContainer
            match = {matchMock}
            history = {historyMock}
        />, {context: {router: <MemoryRouter />}});

    describe("Basic render", () => {

        it("should mount", (done) => {
            expect(wrapper.find('.front-end').length).to.equal(1);
            done();
        });

        it("should render two Links", (done) => {
            expect(wrapper.find(Link).length).to.equal(2);
            done();
        });
    });
});
