const fs = require('fs');

const data = fs.readFileSync('input.txt', 'utf8').trim().split('\n');

module.exports = {
    data
}