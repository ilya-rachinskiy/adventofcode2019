
let processData = (data) => {

    let currentPosition = 0;
    let input1Index, input2Index, outputIndex;



    let inPorgress = true;
    while (inPorgress) {

        input1Index = currentPosition + 1;
        input2Index = currentPosition + 2;
        outputIndex = currentPosition + 3;
        let opCode = data[currentPosition];

        switch (opCode) {

            case 1:
                data[data[outputIndex]] = data[data[input1Index]] + data[data[input2Index]];
                break;
            case 2:
                data[data[outputIndex]] = data[data[input1Index]] * data[data[input2Index]];
                break;
            case 99:
                inPorgress = false;
                break;

        }

        currentPosition += 4;
        if (currentPosition >= data.length) {
            console.log('finish')
            inPorgress = false;
        }

    }
    return data;
}
let findOutput = (data, expectedResult) => {
    let noon = 0;
    let promises = [];
    while (noon <= 99) {
        let verb = 0;
        while (verb <= 99) {
            let copyData = [...data];
            promises.push(computation(copyData, noon, verb));
            verb++;
        }
        noon++;
    }
    console.log(promises.length)
    return Promise.all(promises).then(x => {
        let exist = x.filter(x => x.result == expectedResult)[0];
        return exist.noon * 100 + exist.verb;
    })

}
function computation(data, noon, verb) {
    return new Promise((resolve, reject) => {
        data[1] = noon;
        data[2] = verb;
        let result = processData(data);
        resolve({ noon, verb, result: result[0] });
    });

}


module.exports = findOutput;