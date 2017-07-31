function createFunctions(n) {
    var callbacks = [],
        expression = function (i) {
            return function () {
                return i;
            };
        };
    for (var i = 0; i < n; i++) {
        callbacks.push(expression(i));
    }

    return callbacks;
}
