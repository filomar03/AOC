import { data } from "./input.js";
import { Cell } from "./astar/cell.js";
import { aStar, gridFind } from "./astar/main.js";

const grid = data.map((e, row) => e.map((letter, column) => {
    return new Cell(row, column, letter.match(/[a-z]/) ? letter.charCodeAt(0) - 'a'.charCodeAt(0) : letter)
}))
const start = gridFind(grid, 'S')
start.value = 0
const goal = gridFind(grid, 'E')
goal.value = 25

console.log(`fewest steps required from S: ${aStar(grid, start, goal).f()}`)

const cells = []
let cell
while (cell = gridFind(grid, 0)) {
    cells.push(cell)
    cell.value = 0.5
}
console.log(`fewest steps required from any 0-height position: ${cells.map(cell => aStar(grid, cell, goal)?.f()).filter(cell => cell).sort()[0]}`)