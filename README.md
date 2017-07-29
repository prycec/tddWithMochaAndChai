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
[According to the Web site ...](http://mochajs.org/)

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

## Tutorials
There are three tutorials to help get you started:

1. [Tutorial 1: Simple Testing Using Chai](tutorials/tutorial-1.md)
2. [Tutorial 2: A More Complete Example - Pending] (tutorials/tutorials-2.md)
3. [Tutorial 3: More on TDD]] (tutorials/tutorials-3.md)
