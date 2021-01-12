const queryString = require('querystring');
const TaskModel = require('./model');
const UserService = require('../User/service');

async function editTaskView(req, res) {
    const qstrNikTokenGoalId = `?${queryString.stringify(req.query)}`;
    const goal = await UserService.getGoal(req.query.nik, req.query.goalId);
    const title = `TODO | ${goal.name}`;
    const task = await TaskModel.findOne({ _id: req.params.taskId }).exec();
    const parents = await allTaskParents([], task._id);
    delete req.query.goalId;
    const qstrNikToken = `?${queryString.stringify(req.query)}`;
    res.render('task', {
        title,
        goal,
        qstrNikTokenGoalId,
        qstrNikToken,
        parents,
        task,
    });
}

async function allTaskParents(arrayForParents, taskId) {
    const task = await TaskModel.findById(taskId).exec();
    arrayForParents.push(task);
    if (task.parent !== null) {
        await allTaskParents(arrayForParents, task.parent);
    } else {
        return arrayForParents;
    }
}

module.exports = {
    editTaskView,
};
