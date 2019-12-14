const newRules = {
    3: (data, position) => {
        data[data[position + 1]] = data[position]
        return { data, position }
    },
    4: (data, position) => {
        data[data[position + 1]]
        return { data, position }
    }

}
module.exports = newRules;