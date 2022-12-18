const fs = require('fs')

const data = fs.readFileSync('./input.txt', 'utf-8')
    .replaceAll('\r', '')
    .trim()
    .replaceAll(/Monkey.*\n/g, '')
    .split('\n\n')
    .map(e => e.split('\n')
        .map(e => e.trim()))
    .map(([items, operation, test, branchT, branchF]) => {
            items = items.substring(16).split(',').map(e => parseInt(e))
            operation = [operation.charAt(21) === '*' ? (a, b) => a * b : (a, b) => a + b, operation.substring(23)]
            test = test.substring(test.lastIndexOf(' ') + 1)
            branchT = branchT.substring(branchT.lastIndexOf(' ') + 1)
            branchF = branchF.substring(branchF.lastIndexOf(' ') + 1)

            return [items, operation, test, branchT, branchF]
    })

    
module.exports = {
    data
}