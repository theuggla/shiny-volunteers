/**
 * Tests for the models.
 */

require('mocha');

let chai = require('chai');
let chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);
let expect = chai.expect;

let db = require('./test-db');
db.connect() //- starting a db connection
    .catch(() => {
        db.connect(true); //- starting another db connection
    });

let Need = require('../models/Need');
let Organization = require('../models/Organization');
let TempUser = require('../models/TempUser');
let Volunteer = require('../models/Volunteer');

describe('Models', () => {

    after(() => {
        db.disconnect();
    });

    describe('Need', () => {

        it('should require a creator', (done) => {
            let needData = {
                contact: '44',
                description: '44',
                title: '44'
            };

            let need = new Need(needData);

            need.save()
                .catch((error) => {
                    return done();
                });

        });

        it('should require a title', (done) => {
            let needData = {
                contact: '44',
                description: '44',
                _creator: '44'
            };

            let need = new Need(needData);

            need.save()
                .catch((error) => {
                    return done();
                });
        });

        it('should require a description', (done) => {
            let needData = {
                contact: '44',
                title: '44',
                _creator: '44'
            };

            let need = new Need(needData);

            need.save()
                .catch((error) => {
                    return done();
                });
        });

        it('should set a default expiry date if none is given', () => {
            let needData = {
                contact: '44',
                description: '44',
                title: '44',
                _creator: '44'
            };

            needData.description = '44';

            let need = new Need(needData);

            need.save()
                .then((need) => {
                    return Promise.resolve(expect(need.expiryDate).to.not.equal(undefined));
                });
        });
    });

    describe('TempUser', () => {
        it('should reject if email is not unique', () => {
            let tempOne = {info: {email: 'temp@test.com'}};
            let tempTwo = {info: {email: 'temp@test.com'}};

            let first = new TempUser(tempOne);
            let second = new TempUser(tempTwo);

            first.save()
                .then(() => {
                    return expect(second.save()).to.be.rejected;
                });
        });

        it('should reject if local email is not valid email', () => {
            let badUserData = {local: {email: 'temptest.com'}};

            let badUser = new TempUser(badUserData);

            return expect(badUser.save()).to.be.rejected;
        });
    });

    describe('UserBase', () => {
        it('should reject if email is not unique', () => {
            let tempOne = {info: {email: 'temp@test.com'}};
            let tempTwo = {info: {email: 'temp@test.com'}};

            let first = new Volunteer(tempOne);
            let second = new Volunteer(tempTwo);

            first.save()
                .then(() => {
                    return expect(second.save()).to.be.rejected;
                });
        });

        it('should reject if local email is not valid email', () => {
            let badUserData = {local: {email: 'temptest.com'}};

            let badUser = new Volunteer(badUserData);

            return expect(badUser.save()).to.be.rejected;
        });

        it('should hash a given password', () => {
            let tempOne = {local: {email: 'temp@test.com', password: 'test'}};

            let first = new Volunteer(tempOne);

            first.save()
                .then((user) => {
                    return user.hashPasswordAndSave(tempOne.local.password);
                })
                .then((user) => {
                    return expect(user.local.password).to.not.equal(tempOne.local.password);
                });
        });

        it('should compared a plaintext password to a hashed one and return true if they are equal', () => {
            let tempOne = {local: {email: 'temp@test.com', password: 'test'}};

            let first = new Volunteer(tempOne);

            first.save()
                .then((user) => {
                    return user.hashPasswordAndSave(tempOne.local.password);
                })
                .then((user) => {
                    return user.comparePassword(tempOne.local.password);
                })
                .then((result) => {
                    return expect(result).to.equal(true);
                });
        });

        it('should compared a plaintext password to a hashed one and return false if they are not equal', () => {
            let tempOne = {local: {email: 'temp@test.com', password: 'test'}};

            let first = new Volunteer(tempOne);

            first.save()
                .then((user) => {
                    return user.hashPasswordAndSave(tempOne.local.password);
                })
                .then((user) => {
                    return user.comparePassword('badpassword');
                })
                .then((result) => {
                    return expect(result).to.equal(false);
                });
        });
    });

    describe('Volunteer', () => {
        it('should take a facebook email', () => {
            let tempOne = {facebook: {email: 'temp@test.com', id: 'test'}};

            let first = new Volunteer(tempOne);

            first.save()
                .then((user) => {
                    return expect(user.facebook.email).to.equal(tempOne.facebook.email);
                });
        });

        it('should take a facebook id', () => {
            let temptwo = {facebook: {email: 'temptwo@test.com', id: 'testtwo'}};

            let first = new Volunteer(temptwo);

            first.save()
                .then((user) => {
                    return expect(user.facebook.id).to.equal(temptwo.facebook.id);
                });
        });
    });
});
