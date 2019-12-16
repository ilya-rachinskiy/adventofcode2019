
const getAddress = (mode, data, position) => {
    return mode == 1 ? position : data[position];
}
const newRules = {
    '03': (data, position, modes) => {
        data[getAddress(modes[0], data, position + 1)] = 5;
        position += 2;
        return { data, position }
    },
    '04': (data, position, modes) => {
        console.log(data[getAddress(modes[0], data, position + 1)]);
        position += 2;
        return { data, position }
    },
    '05': (data, position, modes) => {
        position = data[getAddress(modes[0], data, position + 1)] != 0 ? data[getAddress(modes[1], data, position + 2)] : position + 3;
        return { data, position }
    },
    '06': (data, position, modes) => {
        position = data[getAddress(modes[0], data, position + 1)] == 0 ? data[getAddress(modes[1], data, position + 2)] : position + 3;
        return { data, position }
    },
    '07': (data, position, modes) => {
        const res = data[getAddress(modes[0], data, position + 1)] < data[getAddress(modes[1], data, position + 2)] ? 1 : 0;
        data[getAddress(modes[2], data, position + 3)] = res;
        position += 4;
        return { data, position }
    },
    '08': (data, position, modes) => {
        const res = data[getAddress(modes[0], data, position + 1)] == data[getAddress(modes[1], data, position + 2)] ? 1 : 0;
        data[getAddress(modes[2], data, position + 3)] = res;
        position += 4;
        return { data, position }
    }

}
module.exports = newRules;