const input = require('./input.js');

//CrateMover9000
//deep copy stacks from input.js
let stacks = JSON.parse(JSON.stringify(input.stacks));

//execute instructions
input.instructions.forEach(([qty, fromIdx, toIdx]) => {
    let from = stacks[fromIdx - 1], to = stacks[toIdx - 1];
    for (let i = 0; i < qty; i++) {
        to.push(from.pop());
    }
})

//print result
let result = '';
for (let i = 0; i < input.stackNum; i++) result += stacks[i].pop();
console.log('CrateMover 9000:', '\'' + result + '\'');


//CrateMover9001
//deep copy stacks from input.js
stacks = JSON.parse(JSON.stringify(input.stacks));

//execute instructions
input.instructions.forEach(([qty, fromIdx, toIdx]) => {
    let from = stacks[fromIdx - 1], to = stacks[toIdx - 1];
    to.push(...from.splice(-qty, qty))
})

//print result
result = '';
for (let i = 0; i < input.stackNum; i++) result += stacks[i].pop();
console.log('CrateMover 9001:', '\'' + result + '\'');