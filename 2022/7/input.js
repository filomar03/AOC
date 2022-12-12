const fs = require('fs');

const data = fs.readFileSync('input.txt', 'utf8').replaceAll('\r', '').trim().split('\n');

module.exports = {
    data
}