const getAddress = (mode, data, position) => {
    return mode == 1 ? position : data[position];
}
const basicRule = {
    '01': (data, position, modes) => {
        data[getAddress(modes[3], data, position + 3)] = data[getAddress(modes[0], data, position + 1)] + data[getAddress(modes[1], data, position + 2)];
        position += 4;
        return { data, position }
    },
    '02': (data, position, modes) => {
        data[getAddress(modes[3], data, position + 3)] = data[getAddress(modes[0], data, position + 1)] * data[getAddress(modes[1], data, position + 2)];
        position += 4;
        return { data, position }
    },
    '99': (data, position) => {
        position = data.length;
        return { data, position }
    }
}
module.exports = basicRule;