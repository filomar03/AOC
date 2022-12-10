const mod = require('./input');
const utils = require('./utils');

let data = mod.input
    .map(line => {
        return [new Set(line.slice(0, line.length / 2)), new Set(line.slice(line.length / 2))];
    });

data = data.map(sets => utils.findIntersection(sets[0], sets[1]))
    .flat()
    .map((value) => utils.letterToPriority(value));

console.log('items total priority:', data.reduce((acc, val) => acc += val));

data = mod.input;

data.forEach((value, index, array) => {
    if (index % 3 == 0 && typeof value == 'string') 
    array.push(array.slice(index, index + 3));
});

data = data.splice(data.length / 4 * 3).map(strings => {
    return utils.findIntersection(new Set(strings[0]), new Set(strings[1]), new Set(strings[2]),);
}).flat();

console.log('badges total priority:', data.reduce((acc, value) => acc += utils.letterToPriority(value), 0));
