const Dir = function(name, closure = this) { //writing an iterator for would have avoided a lot of troubles
    Object.defineProperty(this, 'name', {
        value: name,
        writable: true
    })
    Object.defineProperty(this, 'closure', {
        value: closure
    })
    Object.defineProperty(this, 'size', {
        value: 0,
        writable: true
    })
}

Object.defineProperty(Dir.prototype, 'toArray', {
    value: function () {
        const dirs = [];    
        
        for (let subDir in this) dirs.push(...this[subDir].toArray());

        return [this, ...dirs];
    }
});

function updateDirSize(dir) {
    for (let subDir in dir) {
        dir.size += updateDirSize(dir[subDir]);
    }
    
    return dir.size;
}

module.exports = {
    Dir,
    updateDirSize
}