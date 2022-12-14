function move(position, direction, value = 1) {
    position[0] += direction[0] * value;
    position[1] += direction[1] * value;
}

function distance([x1, y1], [x2, y2]) {
    return Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2);
}

function direction([x1, y1], [x2, y2]) {
    return [x2 - x1, y2 - y1];
}

function normalize([x, y]) {
    return [x / distance([0, 0], [x, y]), y / distance([0, 0], [x, y])]
}

const bidimToLinearIndex = ([x, y], length, lineFeed = true) => y * (length + (lineFeed ? 1 : 0)) + x % length;

const int = (x) => parseInt(x);

function sum([x1, y1], [x2, y2]) {
    return [x1 + x2, y1 + y2];
}

module.exports = {
    move, 
    distance,
    direction,
    normalize,
    bidimToLinearIndex,
    int,
    sum
}