
var assert = require("assert");

describe("Examples", function () {
    describe(":basic example", function () {
        assert.ok(true);
    });
    // assert.equal
    describe(":indexOf", function () {
        it("should return -1", function () {
            assert.equal(-1, [1, 2, 3].indexOf(5));
        });

        it("should return 2", function () {
            assert.equal(2, ['foo', 'bar', 'biz'].indexOf('biz'));
        });
    });

    // assert strict equal
    describe(":Shallow copy", function () {
        var ar1 = [1, 2, 3];
        var ar2 = ar1;
        var ar3 = [1, 2, 3];

        it("should be equal", function () {
            assert.equal(ar1, ar2);
            assert.strictEqual(ar1, ar2, "these are the same.");
            assert.deepEqual(ar1, ar2);
        });

        it("should not be equal", function () {
            assert.notEqual(ar1, ar3);
        });

        it("should be deep equal", function () {
            assert.deepEqual(ar1, ar3);
            assert.deepEqual(ar1, ar2);
        });

        it("should not be strict equal", function () {
            assert.notStrictEqual(ar1, ar3);
        });
    });

    describe(":async example", function () {
        it("simple sleep", function (itIsDone) {
            assert.ok(true);
            setTimeout(function () {
                itIsDone();
            }, 10);
        });
    });

    describe(":exceptions", function () {
        it("should throw an error", function () {
            assert.throws(function () {
                throw new Error();
            });
        });
    });
});