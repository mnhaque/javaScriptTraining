function zero(closure) {
var value = 0;
if(closure){
        value = closure(value);
    }
    return value;
}
function one(closure) {
var value = 1;
if(closure){
        value = closure(value);
    }
    return value;
}
function two(closure) {
var value = 2;
if(closure){
        value = closure(value);
    }
    return value;
}
function three(closure) {
var value = 3;

if(closure){
        value = closure(value);
    }
    return value;
}
function four(closure) {
var value = 4;

if(closure){
        value = closure(value);
    }
    return value;
}
function five(closure) {
var value = 5;

if(closure){
        value = closure(value);
    }
    return value;
    }
function six(closure) {
var value = 6;
if(closure){
        value = closure(value);
    }
    return value;

}
function seven(closure) {
var value = 7;
if(closure){
        value = closure(value);
    }
    return value;
}
function eight(closure) {
var value = 8;
if(closure){
        value = closure(value);
    }
    return value;
}
function nine(closure) {
var value = 9;
if(closure){
        value = closure(value);
    }
    return value;
  }

function plus(a) {
return function (b){
        return a+b;
    }
}
function minus(a) {
return function (b){
        return b-a;
}}
function times(a) {
return function (b){
        return a*b;
}}
function dividedBy(a) {
return function (b){
        return b/a;
}}