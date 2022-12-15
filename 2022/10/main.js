const { data: instructions } = require('./input')

let register = 1
let cycle = 0
const instructionsCycles = {
    'noop': 1,
    'addx': 2
}   
const taskQueue = []

const signalPollingMod = 20
let signalStrenght = 0

const displayLength = 40
const displayHeight = 6
let crtLineBuffer = '' 
let crtDisplay = []

while (true) {
    //updating cpu cycle
    cycle++

    //part x specific resolution
    //PART 1
    if ((cycle - signalPollingMod) % displayLength == 0) {
        signalStrenght += register * cycle;
    }

    //PART2
    if ((cycle  - 1) % displayLength < register - 1 || (cycle - 1)  % displayLength > register + 1)
        crtLineBuffer += '.'
    else 
        crtLineBuffer += '#'
    
    if (cycle % displayLength == 0) {
        crtDisplay.push(crtLineBuffer)
        crtLineBuffer = ''
    }

    if (cycle % (displayLength * displayHeight) == 0)
        crtDisplay.push('-'.repeat(displayLength))
    //--------------------------


    //emulating cpu fetching instructions
    if (taskQueue.length == 0 && instructions.length == 0) break
    let [[instruction, operand, cyclesReq]] = taskQueue.length != 0 ? taskQueue.splice(0, 1) : instructions.splice(0, 1)

    if (cyclesReq === undefined) {
        cyclesReq = instructionsCycles[instruction]
    }
    //-----------------------------------


    // debug info
    /* if ((cycle - signalStrengthPollingRate) % displayLength == 0 || cycle == signalStrengthPollingRate || true) {
        console.log(`begin executing [opcode: ${instruction}, operand: ${operand}, cycles: ${cyclesReq}]`)
        console.log(`cycle: ${cycle}   reg: ${register}   signal strenght: ${cycle * register}`)
        console.log(`current crt line: ${crtDisplay}`)
        console.log('-'.repeat(displayLength))
    }  */
    //-----------
    

    //emulating cpu eecuting instructions
    if (cyclesReq > 1) {
        taskQueue.push([instruction, operand, cyclesReq - 1])
    } else if (instruction === 'noop') {
        //do nothing
    } else if (instruction === 'addx') {
        register += parseInt(operand)
    }
    //-----------------------------------
}

console.log(`sum of all signal strenght recorded: ${signalStrenght}`)
console.log(`display framebuffer:\n${crtDisplay.join('\n')}`)