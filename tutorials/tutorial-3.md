#Tutorial 3: More on TDD
This is the final tutorial in the TDD With Mocha series. In this tutorial, we will expand on the use of Chai and
the concept of Test-Driven Development with unit tests. We will illustrate the concepts by creating an implementation
of a linked list in JavaScript.


According to Wikipedia, a linked list is:

> In computer science, a linked list is a data structure consisting of a group of nodes which together represent a
 sequence. Under the simplest form, each node is composed of a datum and a reference (in other words, a link) to the
 next node in the sequence; more complex variants add additional links. This structure allows for efficient insertion
 or removal of elements from any position in the sequence.

A linked list is a common data structure, but they do not natively exist in JavaScript. We can create a simple
linked list implementation to demonstrate some TDD concepts and to further explore the Mocha test framework.

The implementation that we want to create needs to be able to `add` a node to the linked list, `remove` a node from
the list, get a node from the list (`item`), and `get` the value of a node from the linked list. It will also export
the list an array (`toArray`) and [export all of the values as comma separated string by overloading the `toString`
method. Finally, it should be able to get the `size` of the linked list.

To start the tutorial, create a new branch in the TDDWithMocha repository:

```
git checkout -b myTutorial3
```

To see the complete listing of the LinkedList class and unit tests, checkout out the `tutorial-3` branch:

```
git checkout tutorial-3
```

### Create a Module.
As with other tutorials in this series we can start by creating our module; that is the code that we will be testing.
Create an new folder at the root level of the project.

1. Insert a new directory called `LinkedList` inside the root folder for the project.
2. Create index.js inside the `LinkedList` directory.
3. Create the constructor and export a public interface

index.js

```javascript
/**
 * A linked list implementation in JavaScript.
 *
 * @constructor
 * @class
 */
var LinkedList = function () {

};

module.exports = LinkedList;
```

### Create the Unit Tests
Next, we will need to create a new unit test.

1. Insert a file in the test directory called `LinkedList-test.spec.js`

Now, we need to create a failing test for our Linked List implementation.

LinkedList-test.spec.js
```javascript
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
});
```

There is some new functionality here to explain. The first three lines should be familiar; we include the expect
package from the Chai.js module, and include the Linked List module that we want to test. At line 6 we declare a
variable that will hold our instantiated linked list.

Line 8 - 14 are probably new. These lines do a setup and tear down step for each test (it() block). The setup
instantiates a new linked list. Tear down deletes it to make it ready for the next setup. The setup and tear down
keeps us from writing duplicate code in each test.

Lines 16 - 22 test the `add()` method. We should be able to add two items to the linked list. Each time we add an item,
it should return the node that we added. When we add two items, we expect the `size` method to return 2.

Start the test runner from the command line:

```
npm test
```

or

```
mocha  -w --reporter spec test/LinkedList-test.spec.js
```

Trouble is, of course, we do not have an add or a size method. When we start the test runner it will inform us that
those methods are undefined. Let's fix that:

index.js
```javascript
/**
 * A linked list implementation in JavaScript.
 * extensively cribbed from:
 * https://github.com/nzakas/computer-science-in-javascript/blob/master/data-structures/linked-list/linked-list.js
 *
 * @constructor
 * @class
 */
var LinkedList = function () {
    this._length = 0;
    this._head = null;
};

LinkedList.prototype = {
    add : function (data) {
        var node = {
            data: data,
            next: null
        };

        var current;
        if (this._head === null) {
            // new list
            this._head = node;
        } else {
            current = this._head;

            while (current.next) {
                // when current.next is null we have reached the end of the list.
                current = current.next;
            }

            current.next = node;
        }

        this._length += 1;
        return node;
    },

    size : function () {
        return this._length;
    }
};

module.exports = LinkedList;
```

When these changes are saved, the test runner should report one passing test. Excellent, on to the next method. Create
a new block of unit tests to test the remove method.

LinkedList-test.spec.js
```javascript
    describe(":remove()", function () {
        it("should remove items", function () {
            linkedList.add('foo');
            linkedList.add('foo');
            expect(linkedList.remove(0)).to.be.an('object');
            expect(linkedList.size()).to.equal(1);
        });
    });
```

When you save the test, you will see the familiar #<Object> has no method 'remove'. Again we will code until that will
turn the test green. The `remove` method looks like this:

index.js
```javascript
    remove : function (index) {
        var item, current, previous, i = 0;
        if (index > -1 && index < this._length) {
            current = this._head;

            if (index === 0) {
                this._head = current.next;
            } else {
                while (i++ < index) {
                    previous = current;
                    current = current.next;
                }

                previous.next = current.next;
            }

            this._length -= 1;
            item = current;

        } else {
            item = null;
        }

        return item;
    }
```

Once you have that method coded and saved, both unit tests should pass.

### Red, Green, Refactor
One of the nice things about unit tests is they make it easy to refactor. For our linked list implementation, we will
be implementing an `item` method to retrieve a node at a certain index and a `get` method that retrieves the value
of a certain node. In each case, we will want to check that the index is inbounds the same way that we check in
`remove`. So we will re-factor that line out and create a re-usable utility method called `inBounds`.

First, let's create a failing unit test for that calls inbounds with a valid index and an invalid index.

LinkedList-test.spec.js
```javascript
    describe(":inBounds()", function () {
        it("should return true for valid index and false for invalid", function () {
            linkedList.add('foo');
            linkedList.add('bar');

            expect(linkedList.inBounds(2)).to.be.false;
            expect(linkedList.inBounds(1)).to.be.true;
        });
    });
```

Now if we add an `inBounds` method, our tests will pass.

index.js
```javascript
// check to see if the index is in bounds
    inBounds : function (index) {
        return (index > -1 && index < this._length);
    }
```

Also, since we have the unit tests we can refactor the remove method to use the `inBounds` call internally:

index.js
```javascript
if (this.inBounds(index)) {
   //...
}
// replaces
// if (index > -1 && index < this._length) {
```

Our unit tests make sure that when we refactor, the existing functionality still works.

### Chaining chai.expect
The chai expect package supports chaining of assertions. For example, our `item` function should return the node
specified by an index. If you examine the add method that we created, the node that is added should have a property
data and and a property next. We can test the return value of the item function in one step:

LinkedList-test.spec.js
```javascript
    describe(":item()", function () {
        it("should return an object with a data and next properties", function () {
            var node = linkedList.add('foo');
            var item = linkedList.item(0);

            expect(item).to.be.an('object').to.have.property('data');
            expect(item.data).to.equal(node.data);
        });
    });
```

### Further Exploration
For further exercises, complete the implementation of LinkedList. A complete listing is available by checking out the
tutorial-3 branch.

1. Implement the `get` method. It should get the text value (.data) of a node with a valid index.
2. Implement the `toArray` method. It should return all of the values of each node in order.
3. Overload `toString` to return a comma-separated list of values.




