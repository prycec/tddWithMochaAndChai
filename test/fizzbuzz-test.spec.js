var expect = require("chai").expect;
var fz = require("../fizzbuzz");

describe("fizzbuzz test", function () {
    it("fizzbuzz should exist", function () {
        expect(fz.fizzbuzz).to.exist;
    });
    it("fizzbuzz should return an array", function () {
        expect(fz.fizzbuzz()).to.be.an("array");
    });
    it("fizzbuzz length is correct", function () {
        expect(fz.fizzbuzz()).to.have.length(100);
    });
    it("fizzbuzz index 2,5,98 should be string fizz", function () {
        expect(fz.fizzbuzz()[2]).to.be.a("string");
        expect(fz.fizzbuzz()[2]).to.equal("fizz");
        expect(fz.fizzbuzz()[5]).to.be.a("string");
        expect(fz.fizzbuzz()[5]).to.equal("fizz");
        expect(fz.fizzbuzz()[98]).to.be.a("string");
        expect(fz.fizzbuzz()[98]).to.equal("fizz");
    });
    it("fizzbuzz index 4,9,99 should be string buzz", function () {
        expect(fz.fizzbuzz()[4]).to.be.a("string");
        expect(fz.fizzbuzz()[4]).to.equal("buzz");
        expect(fz.fizzbuzz()[9]).to.be.a("string");
        expect(fz.fizzbuzz()[9]).to.equal("buzz");
        expect(fz.fizzbuzz()[99]).to.be.a("string");
        expect(fz.fizzbuzz()[99]).to.equal("buzz");

    });
    it("fizzbuzz index 14,29,89 should be string fizzbuzz", function () {
        expect(fz.fizzbuzz()[14]).to.be.a("string");
        expect(fz.fizzbuzz()[14]).to.equal("fizzbuzz");
        expect(fz.fizzbuzz()[29]).to.be.a("string");
        expect(fz.fizzbuzz()[29]).to.equal("fizzbuzz");
        expect(fz.fizzbuzz()[89]).to.be.a("string");
        expect(fz.fizzbuzz()[89]).to.equal("fizzbuzz");

    });
    it("fizzbuzz array contains proper values", function () {
        var fizzBuzzControl = [1, 2, "fizz", 4, "buzz", "fizz", 7, 8, "fizz", "buzz", 11, "fizz", 13, 14, "fizzbuzz", 16, 17, "fizz", 19, "buzz", "fizz", 22, 23, "fizz", "buzz", 26, "fizz", 28, 29, "fizzbuzz", 31, 32, "fizz", 34, "buzz", "fizz", 37, 38, "fizz", "buzz", 41, "fizz", 43, 44, "fizzbuzz", 46, 47, "fizz", 49, "buzz", "fizz", 52, 53, "fizz", "buzz", 56, "fizz", 58, 59, "fizzbuzz", 61, 62, "fizz", 64, "buzz", "fizz", 67, 68, "fizz", "buzz", 71, "fizz", 73, 74, "fizzbuzz", 76, 77, "fizz", 79, "buzz", "fizz", 82, 83, "fizz", "buzz", 86, "fizz", 88, 89, "fizzbuzz", 91, 92, "fizz", 94, "buzz", "fizz", 97, 98, "fizz", "buzz"];
        for (var i = 0; i < fizzBuzzControl.length; i++) {
            expect(fz.fizzbuzz()[i]).to.equal(fizzBuzzControl[i]);
        }
    });
});