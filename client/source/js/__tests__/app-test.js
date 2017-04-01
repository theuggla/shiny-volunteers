//Failing test

var HelloWorld = require('../app.jsx');
var expect = require('expect');

describe('getDiv', function() {
    var d = document.querySelector('#container');

    it('Should exist', function() {
        expect(d.nodeName).toBe('DIV');
    });
});
