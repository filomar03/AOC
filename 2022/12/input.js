const fs = require('fs')

const data = fs.readFileSync('./input1.txt', 'utf-8')
    .replaceAll('\r', '')
    .trim()
    .split('\n')
    .map(e => e.split(''))
    
module.exports = {
    data
}