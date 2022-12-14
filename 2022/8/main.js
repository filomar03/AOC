const input = require('./input.js');
const utils = require('./utils.js');

let visibleMap = input.data.map((arr, y) => arr.map((item, x) => utils.checkTree(input.data, x, y) == true ? 0 : 1));

console.log('visible trees:', visibleMap.flat().filter(val => val == 1).length);

let scoreMap  = input.data.map((arr, y) => arr.map((item, x) => utils.treeScore(input.data, x, y)))

console.log(scoreMap.flat().sort((a, b) => b - a));