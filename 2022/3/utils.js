function findIntersection(...sets) {
    let intersections = [];
    for (let val of sets[0]) {
        let present = true;
        for (let set of sets.slice(1)) {
            if (!set.has(val)) present = false;
        }
        if (present == false) continue;
        intersections.push(val);
    }
    return intersections;
}

function letterToPriority(letter) {
    if (letter == letter.toUpperCase()) {
        return letter.charCodeAt(0) - 'A'.charCodeAt(0) + 27;
    } else { 
        return letter.charCodeAt(0) - 'a'.charCodeAt(0) + 1;
    }
}

module.exports = {
    findIntersection,
    letterToPriority
}