var assert = require('assert');

describe('Basic mocha test', function () {
    it('should not throw errors', function () {
        assert.equal(3, 3);
    });
});

describe('OnClick Query Synthesis'), function () {
    it('should create the expected query', function () {
        document.getElementById('search-terms').value = 'test';
        document.getElementById("search").click();
    });
};