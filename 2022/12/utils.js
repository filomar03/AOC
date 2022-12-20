const Cell = function (y, x, height) {
    this.y = y
    this.x = x
    this.height = height
    this.g = null
    this.h = null
    this.parent = null
}

Cell.prototype.toString = function () {
    return `Cell { y:${this.y}, x:${this.x}, hgt:${this.height}, g:${this.g}, h:${this.h}, parent:[${this.parent?.y}, ${this.parent?.x}] }`
}

const distance = (a, b) => {
    return Math.sqrt((b.y - a.y) ** 2 + (b.x - a.x) ** 2)
}

module.exports = {
    Cell,
    distance
}