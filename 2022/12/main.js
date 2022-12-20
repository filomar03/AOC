import { data } from "./input.js";
import { Cell } from "./a*/cell.js";
import { aStar, gridFind, constructPath } from "./a*/main.js";

const grid = data.map((e, row) => e.map((letter, column) => {
    return new Cell(row, column, letter.match(/[a-z]/) ? letter.charCodeAt(0) - 'a'.charCodeAt(0) : letter)
}))
const start = gridFind(grid, 'S')
start.value = 0
const goal = gridFind(grid, 'E')
goal.value = 3

let path = []
constructPath(aStar(grid, start, goal), path)
console.log(path)
