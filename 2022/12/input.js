const fs = require('fs')

const data = fs.readFileSync('./input2.txt', 'utf-8')
    .replaceAll('\r', '')
    .trim()
    .split('\n')
    .map(e => e.split('').map(e => e.match(/[a-z]/) ? e.charCodeAt(0) - 'a'.charCodeAt(0) : e))
    
module.exports = {
    data
}