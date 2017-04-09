/**
 * Example tests, to succeed to make sure the testing framework is working.
 */

require('mocha-steps');
import React from 'react';
import { shallow } from 'enzyme';
import { mount } from 'enzyme';
import { render } from 'enzyme';
import Foo from './Foo.jsx';

describe('Example tests', () => {

    describe('Mocha and chai', () => {

        it('Should work', (done) => {
            expect('A').to.equal('A');
            done();
        });
    });

    describe('Mocha steps', () => {

        describe("My test-steps", () => {

            step("My first step should work", (done) => {
                done();
            });

            step("My second step! should work", (done) => {
                expect(true).to.equal(true);
                done();
            });

            step("My third step should work also", (done) => {
                done();
            });

        });
    });

    describe("A react suite", () => {
        it("should work for child nodes", (done) => {
            expect(shallow(<Foo />).contains(<p>Oi</p>)).to.equal(true);
            done();
        });

        it("should work for identity", (done) => {
            expect(shallow(<Foo />).is('.foo')).to.equal(true);
            done();
        });

        it("should work to mount", (done) => {
            expect(mount(<Foo />).find('.foo').length).to.equal(1);
            done();
        });
    });
});
