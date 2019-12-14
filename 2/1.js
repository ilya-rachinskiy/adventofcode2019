const processor = require('./processor');
const basicRule = require('./basic-rules');

module.exports = (data) => { return processor(data, basicRule) };