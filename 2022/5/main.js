const input = require('./input.js');

console.log(input.instructions)

input.instructions.forEach(([qty, from, to]) => {
    if (qty === undefined) return;
    for (let i = 0; i < qty; i++) {
        input.stacks[to - 1].push(input.stacks[from - 1].pop());
    }
})

for (let i = 0; i < 9; i++) {
    //console.log(input.stacks[i].pop());
}