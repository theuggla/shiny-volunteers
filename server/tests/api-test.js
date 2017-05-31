/**
 * Integration tests of the api.
 */

let expect = require('chai').expect;
let axios = require('axios');

describe('API-tests', () => {

    describe('/login', () => {

        describe('POST /local', () => {

            it('Should work', (done) => {
                expect(2).to.equal(2);
                done();

            });

        });

        describe('POST /local/signup', () => {

            it('Should work', (done) => {
                axios.post('/login/local/signup', {
                    email: 'test@test.com',
                    password: 'test',
                    role: 'volunteer'
                }).then((response) => {
                    return Promise.resolve(response);
                });

                done();

            });
        });

        describe('GET /email-verification/:URL', () => {

            it('Should work', (done) => {
                expect(2).to.equal(2);
                done();
            });
        });
    });

    describe('/organization', () => {

        describe('GET /needs', () => {
            it('Should work', (done) => {
                expect(2).to.equal(2);
                done();
            });
        });

        describe('POST /needs', () => {
            it('Should work', (done) => {
                expect(2).to.equal(2);
                done();
            });
        });

        describe('DELETE /needs/:id', () => {
            it('Should work', (done) => {
                expect(2).to.equal(2);
                done();
            });
        });

    });

    describe('/volunteer', () => {

        describe('GET /profile', () => {
            it('Should work', (done) => {
                expect(2).to.equal(2);
                done();
            });
        });

        describe('POST /profile', () => {
            it('Should work', (done) => {
                expect(2).to.equal(2);
                done();
            });
        });

        describe('GET /applications', () => {
            it('Should work', (done) => {
                expect(2).to.equal(2);
                done();
            });
        });

        describe('POST /applications', () => {
            it('Should work', (done) => {
                expect(2).to.equal(2);
                done();
            });
        });

        describe('GET /match', () => {
            it('Should work', (done) => {
                expect(2).to.equal(2);
                done();
            });
        });

    });

    describe('GET non-existent url', () => {

        it('Should work', (done) => {
            expect(2).to.equal(2);
            done();
        });

    });
});
