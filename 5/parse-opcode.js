const parseOpcode = (data) => {
    let params = (data + '').split('');
    let last = params.pop();
    let notLast = params.pop();
    const opCode = (notLast || 0) + last;
    const modes = [params.pop(), params.pop(), params.pop()].map(x => x ? parseInt(x, 10) : 0);
    return { opCode, modes };
}
module.exports = parseOpcode;
