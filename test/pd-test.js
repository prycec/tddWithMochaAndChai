/*global describe it*/
var pd = require("../routes/pd");
var assert = require("assert");

describe("getProductDetails", function() {
    var promise = pd.getProductDetails('281246600');
    it("should return a promise", function() {
        assert.ok(promise.then);
    });

    it("should be vaild JSON", function(itIsDone) {
        promise
            .then(function(data) {
                // create
                assert.ok(data.productInfo);
            }, function(err) {
                assert.fail("expected valid json", err);
            })
            .done(function() {
                itIsDone();
            });
    });
});
