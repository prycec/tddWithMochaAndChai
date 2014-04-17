var expect = require('chai').expect;
var LinkedList = require('../LinkedList');

describe("Linked List", function () {
    /* global beforeEach, afterEach */
    var linkedList;

    beforeEach(function () {
        linkedList = new LinkedList();
    });

    afterEach(function () {
        linkedList = undefined;
    });

    describe(":add()", function () {
        it("should add items", function () {
            expect(linkedList.add('foo')).to.be.an('object');
            expect(linkedList.add('bar')).to.be.an('object');
            expect(linkedList.size()).to.equal(2);
        });
    });

    describe(":remove()", function () {
        it("should remove items", function () {
            linkedList.add('foo');
            linkedList.add('bar');
            expect(linkedList.remove(0)).to.be.an('object');
            expect(linkedList.size()).to.equal(1);
        });
    });

    describe(":inBounds()", function () {
        it("should return true for valid index and false for invalid", function () {
            linkedList.add('foo');
            linkedList.add('bar');

            expect(linkedList.inBounds(2)).to.be.false;
            expect(linkedList.inBounds(1)).to.be.true;
        });
    });

    describe(":item()", function () {
        it("should return an object with a data and next properties", function () {
            var node = linkedList.add('foo');
            var item = linkedList.item(0);

            expect(item).to.be.an('object').to.have.property('data');
            expect(item.data).to.equal(node.data);
        });
    });

    describe(":get()", function () {
        it("should return a string", function () {
            linkedList.add('foo');
            expect(linkedList.get(0)).to.equal('foo');
            expect(linkedList.get(1)).to.be.null;
        });
    });

    describe(':toArray', function () {
        it("should return an array of length 2", function () {
            linkedList.add('foo');
            linkedList.add('bar');

            expect(linkedList.toArray()).to.be.an('array').with.length(2);
        });
    });

    describe(":toString()", function () {
        it("should return a comma delimited string", function () {
            linkedList.add('foo');
            linkedList.add('bar');

            expect(linkedList.toString()).to.equal('foo,bar');
        });
    })
});