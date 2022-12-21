import { data } from "./input.js";
import { Cell } from "./astar/cell.js";
import { aStar, gridFind, traversePath } from "./astar/main.js";

const createGrid = (data) => {
    return data.map((e, row) => e.map((letter, column) => {
        return new Cell(row, column, letter.match(/[a-z]/) ? letter.charCodeAt(0) - 'a'.charCodeAt(0) : letter)
    }))
}

const grid = createGrid(data)
const start = gridFind(grid, 'S')
start.value = 0
const end = gridFind(grid, 'E')
end.value = 25

console.log(`fewest steps required from start: ${aStar(grid, start, end).end.f()}`)

const startingPoints = []
let cell
while (cell = gridFind(grid, 0)) {
    startingPoints.push(cell)
    cell.value = 0.1
}

const bestStart = startingPoints.map(cell => {
    const result = aStar(grid, cell, end)
    if (result) return {
            startingCoords: {
                y: result.start.y,
                x: result.start.x
            },
            steps: result.end.f(),
            path: result.path
        }
    return null
}).filter(result => result).sort((a, b) => a.steps - b.steps)[0]

console.log(`fewest steps required from any position with height 0: ${bestStart.steps} from: { y:${bestStart.startingCoords.y}, x:${bestStart.startingCoords.x} }`)