const input = require('./input.js');
const utils = require('./utils.js');

//attach output to it's own command
let commands = [];
input.data.forEach((val, idx, arr) => {
    if (val.charAt(0) != '$') return;

    let container = [];
    for (let i = 1; arr[idx + i] != undefined && arr[idx + i].charAt(0) != '$'; i++) {
        //exclude useless informations
        if (arr[idx + i].charAt(0) != 'd')
            container.push(parseInt(arr[idx + i].split(' ')[0]));
    }

    commands.push([val, container]);
})

//create dir structure
const rootDir = new utils.Dir('root');
let currentDir = rootDir;

//interpret commands
commands.forEach(([command, output]) => {
    if (command.charAt(2) == 'c') {
        let arg = command.split(' ')[2];

        if (arg == '..') currentDir = currentDir.closure;
        else if (arg == '/') currentDir = rootDir;
        else {
            if (!currentDir[arg]) currentDir[arg] = new utils.Dir(arg, currentDir);
            currentDir = currentDir[arg];
        }
    } else {
        if (output.length != 0)
            currentDir.size = output.reduce((acc, val) => acc += val);
    }
});

utils.updateDirSize(rootDir);
const targetSize = 100000;
let selectedDirs = rootDir.toArray().filter(dir => dir.size <= targetSize);

console.log('dir with size <= ' + targetSize + ':', selectedDirs.length, selectedDirs.map(({name}) => name));
console.log('total size of these dirs:', selectedDirs.map(({size}) => size)
    .reduce((acc, val) => acc += val, 0), selectedDirs.map(({size}) => size));


const totalSpace = 70000000;
const spaceRequired = 30000000;
const availableSpace = totalSpace - rootDir.size;
const spaceToFree = spaceRequired - availableSpace;
console.log('space to free up:', spaceToFree);

let suitableDirs = rootDir.toArray().filter(dir => dir.size >= spaceToFree);
console.log('suitable dirs for deletion (sorted):', suitableDirs.map(({name, size}) => [name, size]).sort(([, a], [, b]) => a - b));