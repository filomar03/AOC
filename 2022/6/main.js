const input = require('./input.js');

let marker = null;

input.data.split('').forEach((val, idx, arr) => {    
    if (idx < 3) return;

    if (marker != null) return;

    let dict = {};
    for (let i = 0; i < 4; i++) {
        if (!dict[arr[idx - i]]) {
            dict[arr[idx - i]] = true;
        } else return;
    }

    marker = idx + 1;
});

console.log('chars before \'start-of-packets\':', marker);


marker = null;

input.data.split('').forEach((val, idx, arr) => {    
    if (idx < 13) return;

    if (marker != null) return;

    let dict = {};
    for (let i = 0; i < 14; i++) {
        if (!dict[arr[idx - i]]) {
            dict[arr[idx - i]] = true;
        } else return;
    }

    marker = idx + 1;
});

console.log('chars before \'start-of-message\':', marker);