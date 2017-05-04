/**
 * Tests for the ApplicationPage.
 */

import React from 'react';
import { mount } from 'enzyme';
import sinon from 'sinon';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
const muiTheme = getMuiTheme();

require('mocha-steps');

import ApplicationsPage from '../ApplicationsPage.jsx';

let axios = require('axios');
let MockAdapter = require('axios-mock-adapter');

let mock = new MockAdapter(axios);

mock.onGet('/volunteer/applications').reply(200, {
    applications: [
        { id: 1, title: 'Test Application', description: 'that s being tested' }
    ]
});


describe("ApplicationsPage.jsx", () => {
    const historyMock= [];
    const matchMock = {
        path: '/volunteer/applications'
    };

    describe("componentWillMount", () => {

        sinon.spy(ApplicationsPage.prototype, 'componentWillMount');

        const wrapper = mount(
            <ApplicationsPage
                match = {matchMock}
                history = {historyMock}
            />, {
                context: {
                    muiTheme
                },
                childContextTypes: {muiTheme: React.PropTypes.object}
            });


        step("should make api-call when mounting", (done) => {
            expect(ApplicationsPage.prototype.componentWillMount.calledOnce).to.equal(true);
            done();
        });
    });
});
