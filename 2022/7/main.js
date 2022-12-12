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
const rootDir = new utils.Dir();
let currentDir = rootDir;

//interpret commands
commands.forEach(([command, output]) => {
    if (command.charAt(2) == 'c') {
        let arg = command.split(' ')[2];

        if (arg == '..') currentDir = currentDir.closure;
        else if (arg == '/') currentDir = rootDir;
        else {
            if (!currentDir[arg]) currentDir[arg] = new utils.Dir(currentDir);
            currentDir = currentDir[arg];
        }
    } else {
        if (output.length != 0)
            currentDir.size = output.reduce((acc, val) => acc += val);
    }
});

console.log(rootDir)

function iterateSubDir(dir) {
    let subDirs = [];
    console.log(dir)
    for (let subDir in dir) {
        console.log(subDir)
        subDirs.push(subDir); 
    }
    console.log(subDirs, '\n')
    subDirs.forEach(val => iterateSubDir(val));
}

iterateSubDir(rootDir)