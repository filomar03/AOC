const input = require('./input.js');

let stacks = JSON.parse(JSON.stringify(input.stacks));

input.instructions.forEach(([qty, from, to]) => {
    for (let i = 0; i < qty; i++) {
        stacks[to - 1].push(stacks[from - 1].pop());
    }
})

let result = '';
for (let i = 0; i < input.stackNum; i++) result += stacks[i].pop();
console.log('CrateMover 9000:', '\'' + result + '\'');


stacks = JSON.parse(JSON.stringify(input.stacks));

input.instructions.forEach(([qty, from, to]) => {
    stacks[to - 1].push(...stacks[from - 1].splice(-qty, qty))
})

result = '';
for (let i = 0; i < input.stackNum; i++) result += stacks[i].pop();
console.log('CrateMover 9001:', '\'' + result + '\'');