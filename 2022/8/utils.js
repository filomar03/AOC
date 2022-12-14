const Tree = function (height, isVisible) {
    this.height = height;
    this.isVisible = isVisible;
}

function checkTree(grid, x, y) {
    if (x == 0 || y == 0 || x == grid[0].lenght || y == grid.lenght) return false;
    let target = grid[y][x];
    if (!checkLine(grid[y].slice(0, x), target)) return false;
    if (!checkLine(grid[y].slice(x + 1), target)) return false;
    let vert = grid.map(arr => arr[x]);
    if (!checkLine(vert.slice(0, y), target)) return false;
    if (!checkLine(vert.slice(y + 1), target)) return false;
    return true;
}

function checkLine(heights, target) {
    return heights.some(height => height >= target);
}

function treeScore(grid, x, y) {
    if (x == 0 || y == 0 || x == grid[0].lenght || y == grid.lenght) return 0;
    const target = grid[y][x];
    const h0 = lineScore(grid[y].slice(0, x).reverse(), target);
    const h1 = lineScore(grid[y].slice(x + 1), target);
    const vert = grid.map(arr => arr[x]);
    const v0 = lineScore(vert.slice(0, y).reverse(), target);
    const v1 = lineScore(vert.slice(y + 1), target);
    return h0 * h1 * v0 * v1;
}

function lineScore(line, target) {
    let score = 0;
    for (let tree of line) {
        score++;
        if (tree >= target) break;
    }
    return score;
}

module.exports = {
    Tree,
    checkTree,
    checkLine,
    treeScore,
    lineScore
}