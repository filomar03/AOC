function moveRope (rope, direction, history, target) {
    for (let i = 0; i < rope.length; i++) {
        if (i == 0) {
            move(rope[0], direction)
            continue
        }

        if (calculateDistance(rope[i - 1], rope[i]) >= 2) {
            move(rope[i], normalize(calculateDirection(rope[i], rope[i - 1])).map(e => Math.ceil(Math.abs(e)) * Math.sign(e)))
        } else {
            move(rope[i], direction)
        }

        if (i == target) {
            history[rope[i].join('-')] ? history[rope[i].join('-')]++ : history[rope[i].join('-')] = 1 
        }
    }
}

function move(position, direction, value = 1) {
    position[0] += direction[0] * value;
    position[1] += direction[1] * value;
}

function calculateDistance([x1, y1], [x2, y2]) {
    return Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2);
}

function calculateDirection([x1, y1], [x2, y2]) {
    return [x2 - x1, y2 - y1];
}

function normalize([x, y]) {
    return [x / calculateDistance([0, 0], [x, y]), y / calculateDistance([0, 0], [x, y])]
}

//const bidimToLinearIndex = ([x, y], length, lineFeed = true) => y * (length + (lineFeed ? 1 : 0)) + x % length;

//const int = (x) => parseInt(x);

module.exports = {
    moveRope
}