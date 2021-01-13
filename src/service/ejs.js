const ejs = require('ejs');

function defaultOr(data, property, standard) {
    if (data[property] === undefined) {
        data[property] = standard;
    }
}

module.exports = function render(fileName, data = {}, callback) {
    defaultOr(data, 'title', `TODO | ${data.title || ''}`);
    defaultOr(data, 'baseUrl', 'http://localhost:3000');
    defaultOr(data, 'accountSettingsView', false);
    ejs.renderFile(fileName, data, callback);
};
