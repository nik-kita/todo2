const ejs = require('ejs');

module.exports = function render(fileName, data = {}, callback) {
    data.title = `TODO | ${data.title || ''}`;
    data.baseUrl = 'http://localhost:3000/todo';
    ejs.renderFile(fileName, data, callback);
};
