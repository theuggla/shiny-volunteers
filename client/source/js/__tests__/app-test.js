//Failing test

var HelloWorld = require('../App.jsx');
var expect = require('expect');

describe('getDiv', function() {
    var d = document.querySelector('.show-grid');

    it('Should exist', function() {
        expect(d.nodeName).toBe('ROW');
    });
});
