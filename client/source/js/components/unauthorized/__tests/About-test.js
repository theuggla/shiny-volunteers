/**
 * Test for the About component.
 */

import React from 'react';
import { shallow } from 'enzyme';
import About from '../About.jsx';

describe("About Component", () => {
    it("should mount", (done) => {
        expect(shallow(<About />).find('.about').length).to.equal(1);
        done();
    });

    it("should contain text", (done) => {
        expect(shallow(<About />).contains(<p>About.</p>)).to.equal(true);
        done();
    });
});
