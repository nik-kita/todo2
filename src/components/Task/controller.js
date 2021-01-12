const queryString = require('querystring');
const TaskModel = require('./model');
const UserService = require('../User/service');

async function editTaskView(req, res) {
    const qstrNikTokenGoalId = `?${queryString.stringify(req.query)}`;
    const goal = await UserService.getGoal(req.query.nik, req.query.goalId);
    const title = `TODO | ${goal.name}`;
    const task = await TaskModel.findOne({ _id: req.params.taskId }).exec();
    const subtasksPromises = task.subtasks.map((s) => TaskModel.findById(s).exec());
    const parents = await allTaskParents([], task._id);
    delete req.query.goalId;
    const qstrNikToken = `?${queryString.stringify(req.query)}`;
    const subtasks = await Promise.all(subtasksPromises);
    res.render('task', {
        subtasks,
        title,
        goal,
        qstrNikTokenGoalId,
        qstrNikToken,
        parents,
        task,
    });
}

async function addSubTasks(req, res) {
    const qstrNikTokenGoalId = `?${queryString.stringify(req.query)}`;
    req.body.owner = (await UserService.findByNik(req.query.nik))._id;
    const newTaskPromise = TaskModel.create(req.body);
    delete req.query.goalId;
    const qstrNikToken = `?${queryString.stringify(req.query)}`;
    TaskService.
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
    addSubTasks,
};
