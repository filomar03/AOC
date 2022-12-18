const Monkey = function (items, operation, test, branchT, branchF) {
    return {
        items,
        operation: operation[0],
        operand: operation[1],
        test,
        branchT, 
        branchF,
        inspectCounter: 0
    }
}

const gcd = (a, b) => {
    while (b != 0) {
        const tmp = b
        b = a % b
        a = tmp
    }

    return a
} 

const lcm = (a, b) => a * b / gcd(a, b)

module.exports = {
    Monkey, 
    lcm
}