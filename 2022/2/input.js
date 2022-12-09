const fs = require('fs');

const data = fs.readFileSync('input.txt', 'utf8')
    .split('\n')
    .map(line => line.split(' '));

const FIGURES = {
    A: 1,
    B: 2,
    C: 3,
    X: 1,
    Y: 2,
    Z: 3,
}

const RESULT = {
    X: -1,
    Y: 0,
    Z: 1,
}

function determineWinner(p1, p2) {
    if (p1 == p2) return 0;
    if (Math.abs(p1 - p2) == 2) return (p1 - p2) * -1 / 2;
    return p1 - p2;
}

function determineSymbol(p1, res) {
    if (res == 0) return p1;
    if (res == 1) return p1 % 3 + 1;
    return p1 == 1 ? 3 : p1 - 1;
}

module.exports = {
    data,
    FIGURES,
    RESULT,
    determineWinner,
    determineSymbol
}