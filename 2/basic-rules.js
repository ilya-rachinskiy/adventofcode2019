const getInputs = (mode, data, position) => {
    return mode == 1 ? data[position] : data[data[position]];
}
const basicRule = {
    '01': (data, position, modes) => {

        data[data[position + 3]] = getInputs(modes[0], data, position + 1) + getInputs(modes[1], data, position + 2);
        position += 4;
        return { data, position }
    },
    '02': (data, position, modes) => {
        data[data[position + 3]] = getInputs(modes[0], data, position + 1) * getInputs(modes[1], data, position + 2);
        position += 4;
        return { data, position }
    },
    '99': (data, position) => {
        position = data.length;
        return { data, position }
    }
}
module.exports = basicRule;