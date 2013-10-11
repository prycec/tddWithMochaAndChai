/*global exports*/

var Q = require("q"),
        http = require("http");

function getProductDetails(pid) {
    var stringBuffer = "";
    var json = {};
    var rOptions = {
        host: "store.digitalriver.com",
        port: '80',
        path: "/store/cpryce/en_US/DisplayDRProductInfo/productID." + pid + "/content.name+detailImage+price+buyLink+shortDescription+longDescription+product.variation/output.json/version.2",
        method: 'GET'
    };

    var deferred = new Q.defer();

    // all the async stuff goes here
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
    });
    return deferred.promise;
}

exports.index = function(req, res) {
    res.send("called with product id: " + req.params.pid);
};

exports.getProductDetails = getProductDetails;