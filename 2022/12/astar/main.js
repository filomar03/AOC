import { getNeighbors, heuristic } from './cell.js'

export function aStar(grid, start, end) {
    const openQueue = [start]
    start.g = 0
    start.parent = null
    const closedQueue = [start]

    while (openQueue.length > 0) {
        const current = openQueue.sort((a, b) => b.f() - a.f()).pop()

        if (current === end) return {
            start,
            end,
            path: traversePath(end, (path, acc) => {
                acc.push([path.y, path.x])
            }, [])
        }
        
        const neighborns = getNeighbors(grid, current)
            .filter(n => !closedQueue.includes(n))
            .map(n => { 
                closedQueue.push(n)
                n.h = heuristic(n, end)
                n.g = current.g + 1
                n.parent = current
                return n
            })
        openQueue.push(...neighborns)
    }
    return null
}

export const gridFind = (grid, value) => {
    for(let row of grid) {
        for (let cell of row) {
            if (cell.value === value) return cell
        }
    }
    return null
}

export const traversePath = (path, fun, acc) => {
    if (path.parent) {
        traversePath(path.parent, fun, acc)
        fun(path, acc)
        return acc
    }
    fun(path, acc)
}