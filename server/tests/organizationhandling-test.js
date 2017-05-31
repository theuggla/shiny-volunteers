/**
 * Tests for the organization handling-resource.
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

let addNeed = require('../lib/organizationhandlingresource').addNeed;

let Need = require('../models/Need');

describe('Organization handling module', () => {

    after(() => {
        db.disconnect();
    });

    let needOne = {
        title: 'test',
        description: 'test',
        contact: 'test@test.com'
    };

    let needTwo = {
        title: 'test',
        description: 'test also',
        contact: 'test@test.com'
    };

    let user = {
       _id: 1
    };

    after('clean up database', () => {
        Need.remove({title: 'test'});
    });

    describe('addNeed', () => {

        it('should add a need with the given data and the user as the creator', () => {
            addNeed(user, needOne)
                .then(() => {
                   return Need.find({_creator: user._id});
                })
                .then((needs) => {
                    return Promise.resolve(expect(needs.length).to.equal(1));
                });
        });

    });
});
