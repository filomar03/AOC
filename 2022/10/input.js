const fs = require('fs');

const data = fs.readFileSync('./input.txt', 'utf-8')
    .replaceAll('\r', '')
    .trim()
    .split('\n')
    .map(e => e.split(' '))
    
module.exports = {
    data
}