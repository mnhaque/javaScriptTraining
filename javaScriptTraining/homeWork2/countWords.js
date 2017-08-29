function countWords(str) {
    str = str.trim();
    return str.length == 0 ? 0 : str.split(/\s+/gi).length;
}
