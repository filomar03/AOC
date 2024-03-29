const fs = require('fs');

//readfile e split instuctions from crates (\r is for windows compatibility since it uses CRLF instead of LF)
let [crates, instructions] = fs.readFileSync('input.txt', 'utf8')
    .replaceAll('\r', '')    
    .split('\n\n');

//replace crate in a more convenient rappresentation
crates = crates.slice(0, crates.lastIndexOf(']') + 1)
    .replace('   ', '.')
    .replaceAll('    ', '.')
    .replaceAll(/[^\w.\n]/g, '')
    .split('');

//calculate number of crates and create corresponding stacks
const stackNum = crates.indexOf('\n');
let stacks = [];
for (let i = 0; i < stackNum; i++) stacks.push([]);

//push crate values into stacks
crates.forEach((val, idx, arr) => {
    if (val == '.' || val == '\n') return;
    stacks[idx % (stackNum + 1)].push(val);
});
stacks.forEach(item => item.reverse());

//simplify instuctions
instructions = instructions.trim().split('\n')
    .map(item => item.split(' ')
        .filter((val, idx) => idx % 2 == 1));

        
module.exports = {
    stacks,
    instructions,
    stackNum,
}