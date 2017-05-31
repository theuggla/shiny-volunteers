/**
 * Tests for the models.
 */

require('mocha');

let chai = require('chai');
let chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);
let expect = chai.expect;

let db = require('./test-db');
if (!db.isConnected) db.connect();

let Need = require('../models/Need');
let Organization = require('../models/Organization');
let TempUser = require('../models/TempUser');
let UserBase = require('../models/UserBase');
let Volunteer = require('../models/Volunteer');

describe('Models', () => {

    describe('Need', () => {

        it('should require a creator', () => {
            let needData = {
                contact: '44',
                description: '44',
                title: '44'
            };

            let need = new Need(needData);

            return expect(need.save()).to.reject;
        });

        it('should require a title', () => {
            let needData = {
                contact: '44',
                description: '44',
                _creator: '44'
            };

            let need = new Need(needData);

            return expect(need.save()).to.reject;
        });

        it('should require a description', () => {
            let needData = {
                contact: '44',
                title: '44',
                _creator: '44'
            };

            let need = new Need(needData);

            return expect(need.save()).to.reject;
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

    describe('Organization', () => {
        it('should take a profile', () => {
            let profile = {property: 44};

            let org = new Organization(profile);

            org.save()
                .then((savedorg) => {
                    return Promise.resolve(expect(savedorg).profile.property).to.equal(44);
                })
                .then((result) => {
                    return expect(result).to.equal(true);
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

            let first = new UserBase(tempOne);
            let second = new UserBase(tempTwo);

            first.save()
                .then(() => {
                    return expect(second.save()).to.be.rejected;
                });
        });

        it('should reject if local email is not valid email', () => {
            let badUserData = {local: {email: 'temptest.com'}};

            let badUser = new UserBase(badUserData);

            return expect(badUser.save()).to.be.rejected;
        });

        it('should hash a given password', () => {
            let tempOne = {local: {email: 'temp@test.com', password: 'test'}};

            let first = new UserBase(tempOne);

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

            let first = new UserBase(tempOne);

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

            let first = new UserBase(tempOne);

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
            let tempOne = {facebook: {email: 'temp@test.com', id: 'test'}};

            let first = new Volunteer(tempOne);

            first.save()
                .then((user) => {
                    return expect(user.facebook.id).to.equal(tempOne.facebook.id);
                });
        });
    });
});
