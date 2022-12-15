const mapSize = 50
const halfMap = mapSize / 2
function moveRope (rope, direction, history, target, drawMap = false) {
    let map = ('.'.repeat(mapSize) + '\n').repeat(mapSize)

    if (drawMap) {
        console.log(`moving rope with direction: ${direction}`)
    }

    for (let i = 0; i < rope.length; i++) {
        const knot = rope[i];

        if (i == 0) {
            move(knot, direction)
            if (drawMap) {
                let knotIdx = bidimToLinearIndex([knot[0] + halfMap, knot[1] + halfMap], mapSize)
                map = map.substring(0, knotIdx) + i + map.substring(knotIdx + 1); 
            }
            continue
        }
        
        if (calculateDistance(rope[i - 1], knot) >= 2) {
            move(rope[i], normalize(calculateDirection(knot, rope[i - 1])).map(e => Math.ceil(Math.abs(e)) * Math.sign(e)))
        }
        
        if (drawMap) {
            let knotIdx = bidimToLinearIndex([knot[0] + halfMap, knot[1] + halfMap], mapSize)
            map = map.substring(0, knotIdx) + i + map.substring(knotIdx + 1); 
        }

        if (i == target) {
            history[knot.join('-')] ? history[knot.join('-')]++ : history[knot.join('-')] = 1 
        }
    }

    if (drawMap) {
        console.log(map)
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

const bidimToLinearIndex = ([x, y], length, lineFeed = true) => y * (length + (lineFeed ? 1 : 0)) + x % length;


module.exports = {
    moveRope
}