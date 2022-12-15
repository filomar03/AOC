const { data: monkeys } = require('./input')

const targetRounds = 10000
const reliefModifier = 1

let counter = Array(monkeys.length).fill(0)
let old

for (let round = 0; round < targetRounds; round++) {
    monkeys.forEach(([items, [operator, operand], test, branchT, branchF], index) => {
        for (let item of items) {
            counter[index]++
            const calc = operator === '*' ? (a, b) => a * b : (a, b) => a + b //i know i could have used a var for operand and used ternary on operator, but didn't want to change names
            old = Math.floor(calc(item, operand === 'old' ? item : parseInt(operand)) / reliefModifier)
            if (old % test == 0) {
                monkeys[branchT][0].push(old)
            } else {
                monkeys[branchF][0].push(old)
            }
        }
        items.splice(0, items.length)
    })
}

console.log(`level of monkey business after ${targetRounds} rounds: ${counter.sort((a, b) => b - a).slice(0, 2).reduce((a, b) => a * b)}`)