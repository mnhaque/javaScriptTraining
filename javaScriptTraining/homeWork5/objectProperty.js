Object.prototype.hash = function (string) {
    var keys = string.split('.'),
        val = this;
    for (var i = 0; i < keys.length; i++) {
        if (val && val.hasOwnProperty(keys[i])) {
            val = val[keys[i]]
        } else {
            val = undefined;
        }
    }
    return val;
}
