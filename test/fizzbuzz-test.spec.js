var expect = require("chai").expect;
var fz = require("../fizzbuzz");

describe("fizzbuzz test", function () {
    it("fizzbuzz should return an array", function () {
        expect(fz.fizzbuzz()).to.be.an("array");
    });
    it("fizzbuzz length is correct", function () {
        expect(fz.fizzbuzz()).to.have.length(100);
    });
});