let processor = (memory, instructions) => {

    let currentPosition = 0;
    // let input1Index, input2Index, outputIndex;

    let inPorgress = true;
    while (inPorgress) {

        // input1Index = currentPosition + 1;
        // input2Index = currentPosition + 2;
        // outputIndex = currentPosition + 3;
        let opCode = memory[currentPosition];

        let output = instructions[opCode](memory, currentPosition);
        memory = output.data;
        currentPosition = output.position;
        // switch (opCode) {

        //     case 1:
        //         memory[memory[outputIndex]] = memory[memory[input1Index]] + memory[memory[input2Index]];
        //         break;
        //     case 2:
        //         memory[memory[outputIndex]] = memory[memory[input1Index]] * memory[memory[input2Index]];
        //         break;
        //     case 99:
        //         inPorgress = false;
        //         break;

        // }

        currentPosition += 4;
        if (currentPosition >= memory.length) {
            // console.log('finish')
            inPorgress = false;
        }

    }
    return memory;
}
module.exports = processor;