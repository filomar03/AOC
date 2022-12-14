const input = require('./input.js');
const { move, distance, direction, normalize, bidimToLinearIndex, int, sum } = require('./utils.js');

const head = [0, 0];
const tail = [0, 0];
const positionHistory = {
    '0-0': 1
}

const mapSize = 3;
const halfMapSize = int(mapSize / 2);
const headIdx = bidimToLinearIndex([halfMapSize, halfMapSize], mapSize)

input.data.forEach(([dir, steps]) => {
    const dx = dir === 'R' ? 1 : dir === 'L' ? -1 : 0;
    const dy = dir === 'D' ? 1 : dir === 'U' ? -1 : 0;

    for (let i = 0; i < int(steps); i++) {
        move(head, [dx, dy]);
        
        if (distance(head, tail) >= 2) {
            console.log(`tail is too far, catching up...`)
            move(tail, normalize(direction(tail, head)).map(e => Math.round(e)));
        }

        let map = ('.'.repeat(mapSize) + '\n').repeat(mapSize);

        let tailCenteredPos = sum([halfMapSize, halfMapSize], direction(head, tail));
        let tailIdx = bidimToLinearIndex([tailCenteredPos[0], tailCenteredPos[1]], mapSize);

        map = map.substring(0, headIdx) + 'H' + map.substring(headIdx + 1);
        map = map.substring(0, tailIdx) + (map.charAt(tailIdx) === 'H' ? 'B' : 'T') + map.substring(tailIdx + 1);
    
        console.log(`
AFTER MOVING
head: ${head}
tail: ${tail}
direction: ${direction(head, tail)}
distance: ${distance(head, tail)}
${map}`);

        console.log(':'.repeat(100))
    }
});
