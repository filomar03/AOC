const mod = require('./input');
const utils = require('./utils');

let data = mod.input
    .map(line => {
        return [new Set(line.slice(0, line.length / 2)), new Set(line.slice(line.length / 2))];
    });

data = data.map(sets => utils.findIntersection(sets[0], sets[1]))
    .flat()
    .map((value) => {
        if (value == value.toUpperCase()) {
            return value.charCodeAt(0) - 'A'.charCodeAt(0) + 27;
        } else { 
            return value.charCodeAt(0) - 'a'.charCodeAt(0) + 1;
        }
    });

console.log('intersections total priority:', data.reduce((acc, val) => acc += val));