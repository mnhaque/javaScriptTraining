function compose(first, second) {
    return function () {
        return first(second.apply(this, arguments));
    };
}
