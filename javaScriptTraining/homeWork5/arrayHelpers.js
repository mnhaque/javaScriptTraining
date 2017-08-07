	Array.prototype.square = function () {
	    var arr = [];
	    for (var i = 0; i < this.length; i++) {
	        arr.push(Math.pow(this[i], 2));
	    }
	    return arr;
	}

	Array.prototype.cube = function () {
	    var arr = [];
	    for (var i = 0; i < this.length; i++) {
	        arr.push(Math.pow(this[i], 3));
	    }
	    return arr;
	}
	Array.prototype.sum = function () {
	    var sum = 0;
	    for (var i = 0; i < this.length; i++) {
	        sum += this[i];
	    }
	    return sum;
	}
	Array.prototype.average = function () {
	    var sum = 0;
	    for (var i = 0; i < this.length; i++) {
	        sum += this[i];
	    }
	    return sum / this.length;
	}
	Array.prototype.even = function () {
	    var even = [];
	    for (var i = 0; i < this.length; i++) {
	        if (this[i] % 2 === 0) {
	            even.push(this[i]);
	        }
	    }
	    return even;
	}
	Array.prototype.odd = function () {
	    var odd = [];
	    for (var i = 0; i < this.length; i++) {
	        if (this[i] % 2 !== 0) {
	            odd.push(this[i]);
	        }
	    }
	    return odd;
	}
