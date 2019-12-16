const parseUpcode = require('../5/parse-opcode');
let processor = (memory, instructions) => {

    let currentPosition = 0;

    let inPorgress = true;
    while (inPorgress) {

        let opCode = memory[currentPosition];
        const params = parseUpcode(opCode);
        
        let output = instructions[params.opCode](memory, currentPosition, params.modes);
        memory = output.data;
        currentPosition = output.position;
        
        if (currentPosition >= memory.length) {
            // console.log('finish')
            inPorgress = false;
        }

    }
    return memory;
}
module.exports = processor;