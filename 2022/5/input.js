const fs = require('fs');

const data = fs.readFileSync('input', 'utf8').split('\n\n');
const start = data[0].replace('   ', '[.]').trim();
const moves = data[1].trim();

module.exports = {
    start,
    moves
}