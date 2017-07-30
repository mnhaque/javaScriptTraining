function partitionOn(pred, items) {
    var tr = [],
        fa = [],
        final;
    for (var i = 0; i < items.length; i++) {
        if (pred(items[i])) {
            tr.push(items[i])
        } else {
            fa.push(items[i])
        }
    }
    final = fa.concat(tr)
    for (var i = 0; i < final.length; i++) {
        items[i] = final[i];
    }
    return fa.length;
}
