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

module.exports = {
    findIntersection
}