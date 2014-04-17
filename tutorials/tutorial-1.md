#Simple Testing Using chai.expect

The chai module should be part of the node modules installed for this project. If you have not already done so,
install the module dependencies from the command line with the following command:

```
npm install
```

This should install the chai.js module which provides a BDD style assertions for the Mocha.js unit test framework.

## Valid Parentheses
To illustrate the use of the chai module and the Test-Driven Development in JavaScript, we are going to create a
short JavaScript module. The module will validate a string input, which will only contain left parentheses '(' and right
parentheses ')' characters. The module will return true if the input string contains a valid combination of parentheses;
i.e., there are as many closing parentheses as there opening parentheses.

```
'()'   -> valid
'()('  -> invalid
')()(' -> invalid (not nested properly)
```

To begin, create the skeleton module. Add a folder to the file system called `validParentheses`. Insert a file in this
directory named `index.js`.

index.js
```javascript
module.exports = function validParentheses(parens) {
    return null;
};
```

Now, we will write a failing unit test(s) and then we will code in index.js until our code passes. Create a new file in
the `test` directory called `validParentheses-test.spec.js`.

validParentheses-test.spec.js

```javascript
// import the expect BDD module
var expect = require('chai').expect;

// import the code that we are testing.
var validParentheses = require('../validParentheses');

// create a grouping for our tests with the describe function
describe("Valid Parentheses", function () {

    // run a unit test
    it(": should return true for valid values", function () {
        expect(validParentheses('()')).to.be.true;
    });
});
```

Line 2 imports the chain.js module, specifying the expect package.

Line 4 brings our JavaScript module into scope in the
test file.

In line 6, we create a scope to group unit tests together. If we had other functions in the ValidParentheses package to
test we might organize groups of related functions this way.

Line 10 executes the unit test, running the validParentheses() function inside a scoped block. The expect() function
will pass if the call to validParentheses returns true.

### Start the Mocha test runner
To execute the test, give the following command in the terminal window.

```
mocha -w --reporter spec
```
The test runner will look for any file in `/test` that ends with a .js and execute it as a unit test file. In this case,
there is only a single file. The output should look something like this:

```
$ mocha -w --reporter spec



  Valid Parentheses
    1) : should return true for valid values


  0 passing (5ms)
  1 failing

  1) Valid Parentheses : should return true for valid values:
     AssertionError: expected undefined to be true

```

This is expected, our validParentheses module doesn't return a value yet. Let's fix it so that the test pass. Insert
the following lines of code at line 2:


```javascript
    return true;
```

As soon as you save the file, the test framework should re-run the tests, and now you should see a passing test.

Great! We coded just enough to pass our test. So we need to create a new failing test that further helps us to develop
are module. We will insert a new failing test. Insert the following lines of code into
`test/validParentheses-test.spec.js` after line 13:

```javascript

    it(": should return false for invalid values", function () {
        expect(validParentheses('()(')).to.not.be.true;
    });
```

As soon as you save the file, the test runner should pick up the changes and run all of the tests again. Now, there
should be 1 passing test and one failing test. The problem is that we are not returning false for an invalid value.
So we need to edit our code to pass both tests.

Our first algorithm is very simple. If the number of opening parens is not equal to the number of closing parens, the
string is invalid. Replace the contents of `validParentheses/index.js` with this code:

```javascript
    var count = 0;
    for (var c in parens) {
        if (parens[c] === '(') {
            count += 1;
        }

        if (parens[c] === ')') {
            count -= 1;
        }
    }
    return count === 0;
```

You should immediately see two green tests! Green tests are good.

### Expanding the Tests
So far, we have a pretty simple module, but if we examine the test cases, we can see that we are not testing
for all of the possible cases. Let's insert two new test cases into our test spec file, directly after the first test
for invalid values.

```javascript
            expect(validParentheses('())(')).to.not.be.true;
            expect(validParentheses(')(()')).to.not.be.true;
```

Now with our test failing, we can clean up the code. Building on our existing. In the first case, count would have gone
to -1 when the invalid closing tag was encountered. In the second, we can invalidate the entire string because the
initial tag is a closing tag. Let's fix our validator:

```javascript
    if (parens.charAt(0) === ')') {
        return false;
    }

    var count = 0;
    for (var c in parens) {
        if (parens[c] === '(') {
            count += 1;
        }

        if (parens[c] === ')') {
            count -= 1;
            if (count < 0) {
                return false;
            }
        }
    }
    return count === 0;
 ```

 Now all of our tests should pass. To make sure, let's add a more complex example in the passing tests:

 ```javascript
        expect(validParentheses('(())()((()))')).to.be.true;
 ```

## Red, Green, Refactor
Now that we are fairly confident that our code has test coverage, we can see if there are any improvements that we want
to make to the code. For instance, the code style is not very compact, we could improve on that with confidence. Our
tests will let us know if we have broken anything.

index.js (final listing)
```javascript
module.exports = function validParentheses(parens) {
    if (parens.charAt(0) === ')') {
        return false;
    }

    var count = 0;
    for (var c in parens) {
        if (parens[c] === '(') {
            count++;
        }
        if (parens[c] === ')' && --count < 0) {
            return false;
        }
    }
    return count === 0;
};
```
