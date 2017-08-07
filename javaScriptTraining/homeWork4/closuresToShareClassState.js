// all unit test cases are passing except 
// 1. should not allow cats to be instantiated without a name and an age
//      Expected an error to be thrown
//2.  Uses Object.defineProperty to get and set instance weight
//      Value is not what was expected
var Cat = (function () {
    var array = [];

    function Cat(name, weight) {
        if (!name || !weight) {
            new Error("height or weight can not be empty");
        } else {
            this.name = name;
            this.weight = weight;
            array.push(this);
        }
    }
    Object.defineProperty(Cat, "averageWeight", {
        value: function () {
            var sum = 0;
            for (var i = 0; i < array.length; i++) {
                sum += array[i].weight;
            }
            return sum / array.length;
        }
    });

    return Cat;
}());
