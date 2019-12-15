const getInputs = (mode, data, position) => {
    return mode == 1 ? data[position] : data[data[position]];
}
const newRules = {
    '03': (data, position, modes) => {

        data[data[position + 1]] = 1;
        position += 2;
        return { data, position }
    },
    '04': (data, position, modes) => {
        console.log(data[data[position + 1]]);
        position += 2;
        return { data, position }
    },
    '05': (data, position, modes) => {
        position = data[position + 1] != 0 ? data[position + 2] : position + 3;
        return { data, position }
    },
    '06': (data, position, modes) => {
        position = data[position + 1] == 0 ? data[position + 2] : position + 3;
        return { data, position }
    },
    '07': (data, position, modes) => {
        const res = data[position + 1] < data[position + 2] ? 1 : 0;
        data[position + 3] = res;
        position += 4;
        return { data, position }
    },
    '08': (data, position, modes) => {
        const res = data[position + 1] == data[position + 2] ? 1 : 0;
        data[position + 3] = res;
        position += 4;
        return { data, position }
    }

}
module.exports = newRules;