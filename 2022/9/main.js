const { data: input } = require('./input.js')
const { moveRope } = require('./utils.js')

const rope2k = new Array(2).fill([0, 0])
const rope10k = new Array(10).fill([0, 0])

const rope2kPositions = {
    '0-0': 1
}
const rope10kPositions = {
    '0-0': 1
}

input.forEach(([direction, steps]) => {
    const dx = direction === 'R' ? 1 : direction === 'L' ? -1 : 0
    const dy = direction === 'D' ? 1 : direction === 'U' ? -1 : 0

    for (let i = 0; i < parseInt(steps); i++) { 
        moveRope(rope2k, [dx, dy], rope2kPositions, 1)
        moveRope(rope10k, [dx, dy], rope10kPositions, 9)   
    }
});

console.log(Object.keys(rope2kPositions))
console.log(Object.keys(rope10kPositions))