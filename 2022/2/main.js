const mod = require('./input');

let points = mod.data.map(([opp, me]) => {
    let _opp = mod.FIGURES[opp], _me = mod.FIGURES[me];
    let winner = mod.determineWinner(_me, _opp);

    if (winner == 0) return 3 + _me;
    if (winner > 0) return 6 + _me;
    return 0 + _me; 
})

console.log('score with both moves:', points.reduce((a, b) => a + b));

let realPoints = mod.data.map(([opp, res]) => {
    let _opp = mod.FIGURES[opp], _res = mod.RESULT[res];
    let me = mod.determineSymbol(_opp, _res);
    
    return (_res == 1 ? 6 : _res == 0 ? 3 : 0) + me;
})

console.log('score with opponent move and result:', realPoints.reduce((a, b) => a + b));