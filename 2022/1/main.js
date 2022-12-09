const fs = require('fs');

const input = fs.readFileSync('input', 'utf8');

let data = input.split('\n\n')
    .map(value => value.split('\n')
    .reduce((acc, value) => acc + parseInt(value), 0));

console.log('elf carrying most calories has:', data.sort((a, b) => b - a)[0]);
console.log('top 3 elfs carrying most calories have:', data.sort((a, b) => b - a).slice(0, 3).reduce((acc, value) => acc + value));