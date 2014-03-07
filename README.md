#Test Driven Development (TDD) in JavaScript with Mocha


## What is this TDD We Keep Hearing About?
A test-first software development process. TDD is characterized by a Red-Green-Refactor workflow.

* Red: a developer writes an initially failing automated test case that defines a new function or a new feature.
* Green: The developer produces the minimum amount of code to make the new test pass.
* Refactor: clean-up the code to acceptable coding standards.

One of the important concepts of TDD is to automate the test cycle, and to be able to run all of the tests in the
test suite in an automated fashion. Green is achieved when not only the new test passes, but all tests in the test
suite pass.

One of the advantages of the approach is that the TDD cycle tends to break down larger tasks into small, manageable
discreet tasks, and small code blocks that can be tested independently. Quality of code should increase with better
test coverage.

There are several drawbacks. For one, developers tend to write more code, and the maintenance of the tests adds to the
overhead of the project. Also, it is difficult to address some complex functional and integration testing scenarios;
developers tend to use mocks for database and network integration, and TDD can hide potential problems until later
in the cycle.

## What is Mocha?
[According to the Web site ...](http://visionmedia.github.io/mocha/)

> Mocha is a feature-rich JavaScript test framework running on node and the browser, making asynchronous testing simple
> and fun. Mocha tests run serially, allowing for flexible and accurate reporting, while mapping uncaught exceptions
> to the correct test cases.

Mocha provided several of the project goals for a testing framework:

* Strong asynchronous testing
* Automation
* Strong community support
* Examples and documentation

In addition, Mocha provides a flexible UI, flexible reporting options and support for running in a browser.

## What is Chai?
[According to the Web site ...](http://chaijs.com/)
Chai is a BDD / TDD assertion library for node and the browser that can be delightfully paired with any javascript testing framework.

## Getting Started

To run the example code, you will need to have Node.js and the Node Package Manager(NPM) installed. Please see 
[The Node Website](http://nodejs.org/) for details on how to install Node. NPM should now install automatically with 
recent versions of node. 

To check to see if iNode and NPM are installed correctly, try this from the command line interface:

```
$ node -v
v0.10.22
$ npm -v
v1.3.8
```

Once you hav Node installed, to run the examples:

1. Clone the project from the Digital River gitHub server
1. Change into the project directory
1. Install the project dependencies
1. Start the Web server
1. View the results in a Web  browser

```
> git clone http://github.digitalriverws.net/cpryce/tddWithMocha.git
> cd tddWithMocha
> npm install
> npm start
```

Open a Web browser to http://localhost:4500

##Mocha Tests
All of the Mocha framework tests are in the **/test** directory. ``mocha-test.j`` is an example that illustrates the
testing framework and the default assertion library that is installed with NodJS.

### Starting the Automated Test Runner
Stop the Web Server with ``CTRL+C`` if it is running, and type the following command in the Terminal:

```
> npm test
```

This will invoke the test runner and is equivalent to typing:

```
mocha -w --reporter spec
```

However, with the ``npm test`` command, mocha does not need to be installed globally.

### The First Test Cases
For purposes of illustration, we'll run a simple modified fizzbuzz kata. We want a fizzbuzz function that will return an array of length 100 that contains numbers from 1 to 100. If a number is divisible by 3, we should replace it with "fizz". If it is divisible by 5, we should replace it with "buzz". If it is divisible by both 3 and 5, we should replace it with "fizzbuzz".

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

