const TaskModel = require('./model');

function create(task) {
    return TaskModel.create(task);
}

module.exports = {
    create,
};
