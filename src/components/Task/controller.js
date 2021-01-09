const TaskModel = require('./model');

function createTaskView(req, res) {
    return res.render('addTask', {

    });
}

module.exports = {
    createTaskView,
};
