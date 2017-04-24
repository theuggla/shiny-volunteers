/**
 * Tests for the volunteer API-routes.
 **/

// Requires.
let axios = require('axios');


describe('/profile', () => {

    const PROFILE = {skills: ['IT']};

    it('should work', (done) => {
        expect(2).to.equal(2);
        done();
    });

    it('Should not allow unauthorized requests', function (done) {
        axios({
            method: 'POST',
            url: '/volunteer/profile',
            data: PROFILE
        })
            .then((result) => {
                expect(result.status).to.equal(400);
                done();
            })
            .catch((error) => {
                expect(error.status).to.equal(400);
                done();
            });
        done();
    });
});
    /*const EMAIL = 'test@test.com';
    const ROLES = ['volunteer'];
    const PROFILE = {skills: ['IT']};

    let newUser;
    let authToken;

    before('make user', () => {
        newUser = new Volunteer({
            info: {
                email: EMAIL,
                roles: ROLES
            },
            local: {
                email: EMAIL
            }
        });

        newUser.save()
            .then((user) => {
                let payload = {
                    scopes: user.info.roles,
                    sub: user._id
                };

                authToken = jwt.sign(payload, process.env.JWT_SECRET);
            });
    });

    after('remove user', () => {
        Volunteer.findOne({'info.email': EMAIL}).remove();
    });

    describe('POST', () => {

        it('Should not allow unauthorized requests', function (done) {
            axios({
                method: 'POST',
                url: '/volunteer/profile',
                data: PROFILE
            })
                .catch((error) => {
                    expect(error.status).to.equal(400);
                    done();
                });
        });
    });*/


/*
 it('Should update the profile', (done) => {
 axios({
 method: 'POST',
 url: '/volunteer/profile',
 headers: {'Authorization': `bearer ${authToken}`},
 data: PROFILE
 })
 .then((result) => {
 axios({
 method: 'GET',
 url: '/volunteer/profile',
 })
 .then((result) => {
 expect(result.status).to.equal(200);
 expect(result.data.profile.skills).to.deep.equal(PROFILE.skills);
 done();
 });
 });
 });
});


describe('GET', () => {

 it('Should not allow unauthorized requests', (done) => {
 axios.get('/volunteer/profile')
 .then((result) => {
 expect(result.status).to.equal(400);
 done();
 });
 });

 it('Should return the profile', (done) => {
 axios({
 method: 'POST',
 url: '/volunteer/profile',
 headers: {'Authorization': `bearer ${authToken}`},
 data: PROFILE
 })
 .then((result) => {
 axios({
 method: 'GET',
 url: '/volunteer/profile'
 })
 .then((result) => {
 expect(result.status).to.equal(200);
 expect(result.data.profile.skills).to.deep.equal(PROFILE.skills);
 done();
 });
 });
 });
 });*/
