function zero(pred) {
    return getValue(pred, 0);
}

function one(pred) {
    return getValue(pred, 1)
}

function two(pred) {
    return getValue(pred, 2)
}

function three(pred) {
    return getValue(pred, 3)
}

function four(pred) {
    return getValue(pred, 4)
}

function five(pred) {
    return getValue(pred, 5);
}

function six(pred) {
    return getValue(pred, 6);
}

function seven(pred) {
    return getValue(pred, 7);
}

function eight(pred) {
    return getValue(pred, 8);
}

function nine(pred) {
    return getValue(pred, 9);
}

function getValue(pred, value) {
    if (pred) {
        value = pred(value);
    }
    return value;
}

function plus(a) {
    return function (b) {
        return a + b;
    }
}

function minus(a) {
    return function (b) {
        return b - a;
    }
}

function times(a) {
    return function (b) {
        return a * b;
    }
}

function dividedBy(a) {
    return function (b) {
        return b / a;
    }
}
