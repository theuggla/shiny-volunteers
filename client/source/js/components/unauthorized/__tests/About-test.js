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
        expect(shallow(<About />).contains(<p>Want to help out? Need help? Spark is a free service to match volunteer-bases organizations with people who wants to help. Register as a volunteer, let us know how often you want to help
            and what kind of skills and interest you have and get a list with needs matching your profile where you can apply with a single click, or register as an organization, fill out your needs, and get an email with contact info when someone shows interest.</p>)).to.equal(true);
        done();
    });
});
