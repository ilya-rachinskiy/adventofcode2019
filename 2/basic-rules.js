const basicRule = {
    1: (data, position) => {
        data[data[position + 3]] = data[data[position + 1]] + data[data[position + 2]];
        return { data, position }
    },
    2: (data, position) => {
        data[data[position + 3]] = data[data[position + 1]] * data[data[position + 2]];
        return { data, position }
    },
    99: (data, position) => {
        position = data.length;
        return { data, position }
    }
}
module.exports = basicRule;