var Cat = (function () {
    var array = [];

    function Cat(name, weight) {
        var weight_temp;
        if (!name || !weight) {
            throw new Error("height or weight can not be empty");
        } else {
            this.name = name;
            weight_temp = weight;
            array.push(weight_temp)
        }
        Object.defineProperty(this, 'weight', {
            set: function (weight) {
                array.splice(array.indexOf(weight_temp), 1);
                weight_temp = weight;
                array.push(weight);
            },
            get: function () {
                return weight_temp;
            }
        });
    }
    Object.defineProperty(Cat, "averageWeight", {
        value: function () {
            var sum = 0;
            for (var i = 0; i < array.length; i++) {
                sum += array[i];
            }
            return sum / array.length;
        }
    });
    return Cat;
}());
