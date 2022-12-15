const input = require('./input.js');
const { move, distance, direction, normalize, bidimToLinearIndex, int, sum } = require('./utils.js');

const rope2k = [
    [0, 0], [0, 0]
]
const positionHistory = {
    '0-0': 1
}

const mapSize = 5;
const halfMapSize = int(mapSize / 2);

const headIdx = bidimToLinearIndex([halfMapSize, halfMapSize], mapSize);

const directions = {
    'R': 'right',
    'L': 'left',
    'U': 'up',
    'D': 'down'
}

input.data.forEach(([dir, steps]) => {
    const dx = dir === 'R' ? 1 : dir === 'L' ? -1 : 0;
    const dy = dir === 'D' ? 1 : dir === 'U' ? -1 : 0;

    //console.log(`moving Head ${directions[dir]} ${steps} times`);

    for (let i = 0; i < int(steps); i++) { 
        move(head, [dx, dy]);
        
        if (distance(head, tail) >= 2) {
            //console.log(`moving Tail with direction: ${normalize(direction(tail, head)).map(e => Math.ceil(Math.abs(e)) * Math.sign(e))}`);
            move(tail, normalize(direction(tail, head)).map(e => Math.ceil(Math.abs(e)) * Math.sign(e)));
            positionHistory[tail.join('-')] ? positionHistory[tail.join('-')]++ : positionHistory[tail.join('-')] = 1;
        }

        let map = ('.'.repeat(mapSize) + '\n').repeat(mapSize);

        let tailCenteredPos = sum([halfMapSize, halfMapSize], direction(head, tail));
        let tailIdx = bidimToLinearIndex([tailCenteredPos[0], tailCenteredPos[1]], mapSize);

        map = map.substring(0, headIdx) + 'H' + map.substring(headIdx + 1);
        map = map.substring(0, tailIdx) + (map.charAt(tailIdx) === 'H' ? 'B' : 'T') + map.substring(tailIdx + 1);
    
        /* console.log(`
Head: ${head}
Tail: ${tail}
Direction (Head to Tail): ${direction(head, tail)}
Distance: ${distance(head, tail)}
${map}`); */
    }

    //console.log('-'.repeat(100));
});

console.log(Object.keys(positionHistory).length);