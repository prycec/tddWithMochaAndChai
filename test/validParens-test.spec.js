// import the expect BDD module
var expect = require('chai').expect;

// import the code that we are testing.
var validParentheses = require('../validParentheses');

// create a grouping for our tests with the describe function
describe("Valid Parentheses", function () {

    // run a unit test
    it(": should return true for valid values", function () {
        expect(validParentheses('()')).to.be.true;
        expect(validParentheses('(())()((()))')).to.be.true;
    });

    it(": should return false for invalid values", function () {
        expect(validParentheses('()(')).to.not.be.true;
        expect(validParentheses('())(')).to.not.be.true;
        expect(validParentheses(')(()')).to.not.be.true;
    });
});

