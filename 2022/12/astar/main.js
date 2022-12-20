import { getNeighbors, heuristic } from './cell.js'

export function aStar(grid, start, goal) {
    const openQueue = [start]
    start.g = 0
    const closedQueue = [start]

    while (openQueue.length > 0) {
        const current = openQueue.sort((a, b) => b.f() - a.f()).pop()

        //DEBUG print
        /* const printableOQ = openQueue.sort((a, b) => b.h - a.h)
        console.log(`openQueue: [${printableOQ.length > 3 ? '\n ...' : ''}`)
        printableOQ.slice(-3).forEach(n => console.log(' -', n.toString()))
        console.log(']')
        console.log(`closedQueue: [`)
        closedQueue.slice(-3).forEach(n => console.log(' -', n.toString()))
        console.log(']')
        console.log('on:', current.toString()) */
        //-----------

        if (current === goal) {
            //DEBUG print
            console.log(`FINISHED !!! (${current.g} steps)`) 
            
            return current
        }
        
        const neighborns = getNeighbors(grid, current)
            .filter(n => !closedQueue.includes(n))
            .map(n => { 
                closedQueue.push(n)
                n.h = heuristic(n, goal)
                n.g = current.g + 1
                n.parent = current
                return n
            })
        openQueue.push(...neighborns)

        //DEBUG print
        /* console.log('neighborns: [')
        neighborns.forEach(n => {
            console.log(' -', n.toString())
        })
        console.log(']', '\n' + '-'.repeat(70)) */
        //-----------
    }

    console.log('NO SOLUTIONS !!!')
}

export const gridFind = (grid, value) => {
    let { y, x } = {}
    grid.forEach(row => row.forEach(cell => { if (cell.value === value) { y = cell.y, x = cell.x }}))
    return y != undefined && x != undefined ? grid[y][x] : null
}

export const constructPath = (pathCell) => {
    const str = `[${pathCell.y}, ${pathCell.x}] -> `
    if (pathCell.parent) return constructPath(pathCell.parent) + str
    return str
}