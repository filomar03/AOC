import { getNeighbors, heuristic } from './cell.js'

//let i = 0
export function aStar(grid, start, goal) {
    const openQueue = [start]
    start.g = 0
    const closedQueue = []

    while (openQueue.length > 0) {
        const current = openQueue.sort((a, b) => b.h - a.h).pop()
        closedQueue.push(current)

        const printableOQ = openQueue.sort((a, b) => b.h - a.h)
        console.log(`openQueue: [${printableOQ.length > 3 ? '\n ...' : ''}`)
        printableOQ.slice(-3).forEach(n => console.log(' -', n.toString()))
        console.log(']')
        console.log(`closedQueue: [`)
        closedQueue.slice(-3).forEach(n => console.log(' -', n.toString()))
        console.log(']')
        console.log('on:', current.toString())

        if (current === goal) {
            console.log(`FINISHED !!! (${current.g} steps)`) 
        
            //path not working
            return current
        }
        
        const neighborns = getNeighbors(grid, current)
            .filter(n => !closedQueue.includes(n))
            .map(n => { //read more about f, g and h to understant what's going
                n.h = heuristic(n, goal)
                n.g = current.g + 1
                n.parent = current
                return n
            })
        openQueue.push(...neighborns) //add to closeQueue directly now??

        console.log('neighborns: [')
        neighborns.forEach(n => {
            console.log(' -', n.toString())
        })
        console.log(']', '\n' + '-'.repeat(70))
        
        //if (i++ > 500) return null
    }

    console.log('NO SOLUTIONS !!!')
}

export const gridFind = (grid, value) => {
    let { y, x } = {}
    grid.forEach(row => row.forEach(cell => { if (cell.value === value) { y = cell.y, x = cell.x }}))
    return y != undefined && x != undefined ? grid[y][x] : null
}

export const constructPath = (pathCell, pathArray) => {
    if (pathCell.parent) constructPath(pathCell.parent, pathArray)
    pathArray.push([pathCell.y, pathCell.x])
}