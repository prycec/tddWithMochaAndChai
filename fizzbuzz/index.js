/**
 * Created by stuller on 3/7/14.
 */

module.exports = {
    fizzbuzz: function () {
        var fizzBuzzArray = [];
        for (var i = 1; i < 101; i++) {
            if (i % 3 === 0 && i % 5 === 0) {
                fizzBuzzArray.push("fizzbuzz");
            } else if (i % 3 === 0) {
                fizzBuzzArray.push("fizz");
            } else if (i % 5 === 0) {
                fizzBuzzArray.push("buzz");
            } else {
                fizzBuzzArray.push(i);
            }
        }
        return fizzBuzzArray;
    }
};