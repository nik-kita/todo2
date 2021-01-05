const ejs = require('ejs');

module.exports = function render(fileName, data = {}, callback) {
    data.title = `TODO | ${data.title || ''}`;
    data.baseUrl = 'http://localhost:3000';
    ejs.renderFile(fileName, data, callback);
};
