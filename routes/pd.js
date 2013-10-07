/*global exports*/

exports.index = function(req, res) {
    res.send("called with product id: " + req.params.pid);
};