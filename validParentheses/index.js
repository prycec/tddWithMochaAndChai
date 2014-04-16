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
