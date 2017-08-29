function getMiddle(s) {
    var middle = s.length / 2,
        middleSubString;
    if (!(s.length % 2)) {
        middleSubString = s.substr(middle - 1, 2);
    } else {
        middleSubString = s.substr(Math.ceil(middle) - 1, 1);
    }
    return middleSubString;
}
