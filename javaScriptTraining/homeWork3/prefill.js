function prefill(n, v) {
    if (!(/^(\+)?([0-9]+)$/.test(n))) {
        throw new TypeError(n + " is invalid");
    }
    var result = [];
    fill(n, v, result);
    return result;
}

function fill(n, v, result) {
    if (n <= 1) {
        if (n == 1) {
            result.push(v);
        }
    } else {
        var n2 = Math.floor(n / 2);
        fill(n2, v, result);
        fill(n - n2, v, result);
    }
}
