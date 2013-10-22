/*global exports*/
var Q = require("q"),
        http = require("http");

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

exports.index = function(req, res) {
    getProductDetails(req.params.pid)
        .then(function(json) {
            res.json(json);
        }, function(err) {
            res.json({"error" : err});
        });
};

exports.getProductDetails = getProductDetails;