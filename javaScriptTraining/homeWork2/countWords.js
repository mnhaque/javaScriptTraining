function countWords(str) {
    var splitt = str.replace(/\s/gi, ' ').split(' ');
    var result = [];
    for (var i = 0; i < splitt.length; i++) {
        if (splitt[i]) {
            result.push(splitt[i]);
        }
    }
    return result.length;
}
