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

To run the example code, you will need to have Node.js and the Node Package Manager(NPM) installed. Please see 
[The Node Website](http://nodejs.org/) for details on how to install Node. NPM should now install automatically with 
recent versions of node. 

To check to see if iNode and NPM are installed correctly, try this from the command line interface:

```
$ node -v
v0.10.16
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
For purposes of illustration, we have decided that we want to create service to go and get Product Detail data from the
GC Commerce platform. This service will have one public function, ``getProductDetails`` that will return a promise.
When the promise is fulfilled, it will return a json data structure with a productInfo property.

To create the test, it is first necessary to create a stub file for the product details service. To this, a file in the
**/routes/** is added to file system as **/routes/pd.js**. We need to add a stub that we will build on.

pd.js listing

```javascript
/*global exports*/
// declare a function scoped to this block
function getProductDetails(pid) {

}

// export a public interface (for testing)
exports.getProductDetails = getProductDetails;
```

Next we will write the tests in Mocha using the BDD-style interface and Node's assert library. Save this file in the
**/tests** directory as ``pd-test.js``.

```javascript```
/*global describe it*/

var pd = require("../routes/pd");
var assert = require("assert");

describe("getProductDetails", function() {
    var promise = pd.getProductDetails('281246600');

    it("is a promise", function() {
        assert.ok(promise.then);
    });
});

```

The first line pulls in the route file that we want to test with the public getProductDetails function. The second
line includes Node's assert library.

The enclosing ``describe()`` function takes a string and an anonymous function as the two arguments. It sets
up a top level grouping for our spec reporter, allowing us to group our two related tests under a common header.

Next, we call the function that we are testing, assigning the results to a variable ``promise``. According to the
CommonJS/PromiseA API, the return value from ``getProductDetails`` should have a method name then. Our first test
uses Duck-typing to establish that the method return the correct type of object.

### Red - Green - Refactor
Start the test runner with the command ``npm start``. Note the 8 passing tests and the one red test that is failing. Our
stub method in ``pd.js`` does not return a promise.

Let's resolve that now by writing the least amount of code that we can to make the test pass. Our new listing for
``pd.js`` looks like this:

```javascript
/*global exports*/
var Q = require('q');

// declare a function scoped to this block
function getProductDetails(pid) {
    var deferred = new Q.defer();

    // do async request here.
    return deferred.promise;
}

exports.getProductDetails  = getProductDetails;
```

Our first line pulls in the library that will provide the framework for Promise API, Q. Line five, constructs the promise
object. and line 8 we return the read-only token to the test.

With this new code, our  first test passes, and we can begin to write our second test.

Directly below our first test, add the following lines of code:

```javascript
    it("should be vaild JSON", function(itIsDone) {
        promise
            .then(function(data) {
                assert.ok(data.productInfo);
            }, function(err) {
                assert.fail("expected valid json", err);
            })
            .done(function() {
                itIsDone();
            });
    });
```

Now we are testing when the promise is fulfilled in our async function that the data returned is json data with a
non-null ``productInfo`` property. 

You may also notice in our second test, we are taking a parameter to the anonymous function that we are passing as the second argument to ``it()``. This is a signal to the Mocha framework that the test is an asynchronous test. The final step in the Promise chain, the ``.done()`` method invokes this callback, signalling Mocha that the asynchronous test is complete.

When the file is saved and the test suite runs again, we now have 9 passing tests and one red one. Time to fix that. 

I won't go into the details, but here is the complete product details function that
should pass the second test, and return json data

```javascript
function getProductDetails(pid) {
    var deferred = new Q.defer();
    var stringBuffer = "";
    var json = {};
    var rOptions = {
        host: "store.digitalriver.com",
        port: '80',
        path: "/store/cpryce/en_US/DisplayDRProductInfo/productID." + pid + "/content.name+detailImage+price+buyLink+shortDescription+longDescription+product.variation/output.json/version.2/env=design",
        method: 'GET'
    };

    http.get(rOptions, function (xhr) {
        xhr.setEncoding('utf8');

        xhr.on('data', function (chunk) {
            stringBuffer += chunk;
        });

        xhr.on('end', function () {
            try {
                json = JSON.parse(stringBuffer);
            } catch (e) {
                deferred.reject("can't parse response as JSON");
            }

            deferred.resolve(json);
        });

        xhr.on("error", function(e) {
            deferred.reject(e);
        })
    });
    return deferred.promise;
}
```

##Next Steps
Add a route to the ``pd.js`` file to return JSON to a web browser: 

```javascript
exports.index = function(req, res) {
    getProductDetails(req.params.pid)
        .then(function(json) {
            res.json(json);
        }, function(err) {
            res.json({"error" : err});
        });
};
```

This new function invokes the ``getProductDetails`` function, and returns the JSON data to the web browser. Exit the test
runner and start the web server using ``npm start``. Open http://localhost:4500/ in a Web browser and click on a valid
product link. You should see a JSON object on the next page. 

### Further Testing
There are three invalid product links on this page, each illustrating three potential errors. An error output from our
service should look like this: 

```javascript
{ "Error": {
        "error" : "errorType",
        "message" : "some descriptive explaination"
    }
}
```

1. **PIDs should contain only numbers.** Write a test that expects ``getProdcutDetails`` to return a JSON object with
Error.error === "Invalid PID", and the message "Product IDs should only contain numbers."
2. **PID should be at least 9 characters in length.** Write a test that expects ``getProductDetails`` to return an error
object to cover this condition.
3. **Prodcut ID does not exist.** The third product link contains a PID for a product that does not exist on this site. 
The JSON that is produces by this code does not match other error messages. Write a test that expects ``getProductDetails``
to normalize the error message.


