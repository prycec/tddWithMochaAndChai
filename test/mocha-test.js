/*global describe require*/

var assert = require("assert");

describe("Examples", function () {
    // assert.equal
    describe(":indexOf", function() {
        it("should return -1", function() {
            assert.equal(-1, [1,2,3].indexOf(5));
        });

        it("should return 2", function() {
            assert.equal(2, ['foo', 'bar', 'biz'].indexOf('biz'));
        });
    });

    // assert.notequal
    describe(":Shallow copy", function() {
        var ar1 = [1, 2, 3];
        var ar2 = ar1;
        it("should be equal", function() {
            assert.equal(ar1, ar2, "these are the same.");
        });
    });

    describe(":async example", function () {
        it("simple sleep");
    })
});
