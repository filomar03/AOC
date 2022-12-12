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

function iterateSubDir(dir) {
    console.log('from:', dir);
    for (let subDir in dir) {
        console.log('to:', subDir);
        //iterateSubDir(subDir); 
    }
    console.log();
}

iterateSubDir(rootDir);
iterateSubDir(rootDir.stocazzo);
iterateSubDir(rootDir.stocazzo.stocazzino);
iterateSubDir(rootDir.stocazzo.stocazzillo);
iterateSubDir(rootDir.frocio);
iterateSubDir(rootDir.frocio.frociazzo);
iterateSubDir(rootDir.frocio.frocione);