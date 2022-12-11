const fs = require('fs');

let [crates, instructions] = fs.readFileSync('input.txt', 'utf8')
    .replaceAll('\r', '')    
    .split('\n\n');

crates = crates.slice(0, crates.lastIndexOf(']') + 1)
    .replace('   ', '.')
    .replaceAll('    ', '.')
    .replaceAll(/[^\w.\n]/g, '')
    .split('');

let stacks = [];
for (let i = 0; i < 9; i++) stacks.push([]);
crates.forEach((val, idx) => {
    if (val == '.' || val == '\n') return;
    stacks[idx % 10].push(val);
})

instructions = instructions.split('\n')
    .map(item => item.split(' ')
        .filter((val, idx) => idx % 2 == 1));


module.exports = {
    stacks,
    instructions
}