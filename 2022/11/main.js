const { data } = require('./input')
const { Monkey, lcm } = require('./utils')

function parseMonkeys (data) {
    return data.map(([items, operation, test, branchT, branchF]) => {
        //console.log(items, operation, test, branchT, branchF)
        return new Monkey(items, operation, test, branchT, branchF)
    })
} 

function inspectItems (monkeys, monkey, reliefModifier, manageableLvl) {
    monkey.items.forEach(item => {
        monkey.inspectCounter++
        item = monkey.operation(item, monkey.operand === 'old' ? item : parseInt(monkey.operand))
        item = Math.floor(item / reliefModifier)
        item %= manageableLvl
        if (item % monkey.test == 0) 
        monkeys[monkey.branchT].items.push(item)
        else
        monkeys[monkey.branchF].items.push(item)    
    })
    monkey.items = []
}


let monkeys = parseMonkeys(data)
const monkeysLcm = monkeys.map(monkey => monkey.test).reduce(lcm)
for (let i = 0; i < 20; i++) {
    monkeys.forEach(monkey => inspectItems(monkeys, monkey, 3, monkeysLcm))
}
console.log(`monkey business after 20 rounds with relief: ${monkeys.map(element => element.inspectCounter).sort((a, b) => b - a).slice(0, 2).reduce((a, b) => a * b)}`)


monkeys = parseMonkeys(data)
for (let i = 0; i < 10000; i++) {
    monkeys.forEach(monkey => inspectItems(monkeys, monkey, 1, monkeysLcm))
}
console.log(`monkey business after 10k rounds with no relief: ${monkeys.map(element => element.inspectCounter).sort((a, b) => b - a).slice(0, 2).reduce((a, b) => a * b)}`)
