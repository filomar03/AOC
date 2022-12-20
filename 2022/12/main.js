const { data } = require('./input')
const { Cell, distance } = require('./utils')

function getNeighbors(grid, {y, x, height, parent}) {
    const neighborns = [[y - 1, x], [y + 1, x], [y, x - 1], [y, x + 1]]
    return neighborns.map(([_y, _x]) => grid[_y] ? grid[_y][_x] : undefined)
        .filter(cell => cell && height - cell.height >= -1 && cell != parent)
}

function aStar(grid, start, goal) {
    const openSet = [start]
    start.g = 0
    const closedSet = []

    while (openSet.length > 0) {
        /* console.log('queue: [')
        openSet.slice(-3).forEach(n => console.log(' -', n.toString()))
        console.log(']') */

        const current = openSet.sort((a, b) => b.h - a.h)
            .pop()   
            
        closedSet.push(current)
    
        console.log(current.y, current.x, current.g)
        //console.log('on:', current.toString())

        if (current === goal) {
            console.log('finished')

            return current
        }
        
        const neighborns = getNeighbors(grid, current)
            .map(n => {
                n.h = distance(n, goal)
                n.g = current.g + 1
                n.parent = current
                return n
            }).filter(n => !closedSet.includes(n))
        openSet.push(...neighborns)

        /* console.log('neighborns: [')
        neighborns.forEach(n => {
            console.log(' -', n.toString())
        })
        console.log(']', '\n' + '-'.repeat(30)) */
    }

    console.log('no solutions')
}

function gridFind(grid, value) {
    let { y, x } = {}
    grid.forEach(row => row.forEach(cell => { if (cell.height === value) { y = cell.y, x = cell.x }}))
    return y != undefined && x != undefined ? grid[y][x] : null
}

const grid = data.map((e, row) => e.map((letter, column) => {
    return new Cell(row, column, letter.match(/[a-z]/) ? letter.charCodeAt(0) - 'a'.charCodeAt(0) : letter)
}))
const start = gridFind(grid, 'S')
start.height = 0
const goal = gridFind(grid, 'E')
goal.height = 25

//console.log(grid)
//console.log(getNeighbors(grid, start))
console.log(aStar(grid, start, goal))
