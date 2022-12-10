const input = require('./input.js');
const utils = require('./utils');

let data = input.data.map(line => line
    .map(str => str.split('-')
        .map(val => parseInt(val)))
    .map(([a, b]) => new utils.Range(a, b)));

console.log('fully contained pairs:', data.filter(([r1, r2]) => {
        let [small, big] = r1.size <= r2.size ? [r1, r2] : [r2, r1];
        if (small.start < big.start) return false;
        if (small.end > big.end) return false;
        return true;
    })
    .length);

console.log('overlapping pairs:', data.filter(([r1, r2]) => {
        let [low, high] = r1.start < r2.start ? [r1, r2] : [r2, r1];
        return !(low.end < high.start);
    }).length);