const fs = require('fs');

const stackNum = 9;

let [crates, instructions] = fs.readFileSync('input.txt', 'utf8')
    .replaceAll('\r', '')    
    .split('\n\n');


crates = crates.slice(0, crates.lastIndexOf(']') + 1)
    .replace('   ', '.')
    .replaceAll('    ', '.')
    .replaceAll(/[^\w.\n]/g, '')
    .split('');

let stacks = [];
for (let i = 0; i < stackNum; i++) stacks.push([]);
crates.forEach((val, idx, arr) => {
    if (val == '.' || val == '\n') return;
    stacks[idx % (stackNum + 1)].push(val);
});
stacks.forEach(item => item.reverse());


instructions = instructions.trim().split('\n')
    .map(item => item.split(' ')
        .filter((val, idx) => idx % 2 == 1));


let stx = stacks;

module.exports = {
    stacks,
    instructions,
    stackNum,
}