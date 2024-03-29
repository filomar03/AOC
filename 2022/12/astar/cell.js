export const Cell = function (y, x, value, g = null, h = null, parent = null) {
    this.y = y
    this.x = x
    this.value = value
    this.g = null
    this.h = null
    this.parent = null
}

Cell.prototype.f = function () {
    return this.g + this.h
}

Cell.prototype.toString = function () {
    return `Cell { y:${this.y}, x:${this.x}, value:${this.value}, f:${this.f()}, g:${this.g}, h:${this.h}, parent:[${this.parent?.y}, ${this.parent?.x}] }`
}

export const getNeighbors = (grid, {y, x, value}) => {
    const neighborns = [[y - 1, x], [y + 1, x], [y, x - 1], [y, x + 1]]
    return neighborns.map(([_y, _x]) => grid[_y] ? grid[_y][_x] : undefined)
        .filter(cell => cell && value - cell.value >= -1)
}

export const heuristic = (current, end) => {
    return Math.sqrt((end.y - current.y) ** 2 + (end.x - current.x) ** 2)
}