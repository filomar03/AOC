let Range = function (a, b) {
    this.start = a;
    this.end = b;
    this.size = b - a;
}

module.exports = {
    Range
}