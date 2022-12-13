const input = require('./input.js');
const utils = require('./utils.js');

let grid = input.data.map((row, rowIndex) => {
    return row.map((height, columnIndex) => {
        let isVisible = rowIndex == 0 || columnIndex == 0 || rowIndex == input.data.length - 1 || columnIndex == row.length - 1 ? true : null;
        return new utils.Tree(height, isVisible);
    })
})

console.log(grid);