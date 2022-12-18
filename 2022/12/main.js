const { data } = require('./input')
const {  } = require('./utils')

function aStar(start, goal) {
    
}

let start
let goal
data.forEach((line, row) => line.forEach((cell, column) => {
    if (cell === 'S') start = [row, column]
    if (cell === 'E') goal = [row, column]
}))
