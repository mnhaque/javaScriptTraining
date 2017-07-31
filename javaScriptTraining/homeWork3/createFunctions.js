function createFunctions(n) {
    var callbacks = [];

    for (var i = 0; i < n; i++) {
        callbacks.push(getVal(i));
    }

    return callbacks;
}
