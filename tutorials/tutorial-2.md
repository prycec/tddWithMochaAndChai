#Tutorial 2: Expanding on the use of Chai
This tutorial will build on the second tutorial

### The First Test Cases
For purposes of illustration, we'll run a simple modified fizzbuzz kata. We want a fizzbuzz function that will return an
array of length 100 that contains numbers from 1 to 100. If a number is divisible by 3, we should replace it with "fizz".
If it is divisible by 5, we should replace it with "buzz". If it is divisible by both 3 and 5, we should replace it with
"fizzbuzz".

To begin, we created the **/fizzbuzz** directory.
Next, we created **/fizzbuzz/index.js**. This will be the file where we create the fizzbuzz function.


/fizzbuzz/index.js

```javascript```
module.exports = {
    fizzbuzz: function () {

    }
};

```

Next we will write the tests in Mocha using the BDD-style interface and Chai's expect library. Save this file in the
**/tests** directory as ``fizzbuzz-test.spec.js``.


```javascript```
var expect = require("chai").expect;
var fz = require("../fizzbuzz");

describe("fizzbuzz test", function () {
    it("fizzbuzz should return an array", function () {
        expect(fz.fizzbuzz()).to.be.an("array");
    });
});

```

The first two lines require chai and the file that contains our fizzbuzz function.

The enclosing describe() function takes a string that will be a label for our test suite and an anonymous function as the two arguments. It sets up a top level grouping for our spec reporter, allowing us to group our two related tests under a common header.

The first test is that we expect the fizzbuzz function to return an array. The test takes two arguments, a string that will act as a label for the test, and an anonymous function where we write code that says we expect the fizzbuz function to return an array.

### Red - Green - Refactor
Start the test runner with the command ``npm start``. Note the 8 passing tests and the one red test that is failing. The fizzbuzz function does not do anything yet.

Let's resolve that now by writing the least amount of code that we can to make the test pass. Our new listing for
``/fizzbuzz/index.js`` looks like this:

```javascript
    module.exports = {
        fizzbuzz: function () {
            var fizzBuzzArray = [];
        }
        return fizzBuzzArray;
    };
```

With this new code, our  first test passes, and we can begin to write our second test.

Back in fizzbuzz-test.spec.js, directly below our first test, add the following lines of code:

```javascript
    it("fizzbuzz length is correct", function () {
        expect(fz.fizzbuzz()).to.have.length(100);
    });
```

Now we are testing that fizzbuzz returns an array of length 100.

When the file is saved and the test suite runs again, we now have 9 passing tests and one red one. Time to fix that - it's up to you.

##Next Steps
Think about which additional tests you should add to complete the kata. Remember to write the failing test first, and then only the code necessary to make the test pass. Then it's back to writing another test. **Red, Green, Refactor**

