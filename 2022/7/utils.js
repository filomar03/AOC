const Dir = function(closure = this) {
    Object.defineProperty(this, 'closure', {
        value: closure
    })
    Object.defineProperty(this, 'size', {
        value: 12,
        writable: true
    })
}

module.exports = {
    Dir
}