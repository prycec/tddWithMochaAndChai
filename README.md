#Test Drive Development (TDD) with Mocha

## What is this TDD We Keep Hearing About?
A test-first software development process. TDD is characterized by a Red-Green-Refactor process.

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
According to the Web site ...

> Mocha is a feature-rich JavaScript test framework running on node and the browser, making asynchronous testing simple
> and fun. Mocha tests run serially, allowing for flexible and accurate reporting, while mapping uncaught exceptions
> to the correct test cases.

Mocha provided several of the project goals for a testing framework:

* Strong asynchronous testing
* Automation
* Strong community support
* Examples and documentation

In addition, Mocha provides a flexible UI, flexible reporting options and support for running in a browser.

## Getting Started
1. Clone the project from the Digital River gitHub server
1. Change into the `tddWithMocha` directory
1. Install the project dependencies
1. Start the Web server.
1. View the results in a Web  browser

```
> git clone http://github.digitalriverws.net/cpryce/tddWithMocha.git
> cd tddWithMocha
> npm install
> npm start
```

Open a Web browser to http://localhost:4500

