const queryString = require('querystring');
const TaskModel = require('./model');
const UserService = require('../User/service');

async function editTaskView(req, res) {
    const qstrNikTokenGoalId = `?${queryString.stringify(req.query)}`;
    console.log(req.query);
    const goal = await UserService.getGoal(req.query.nik, req.query.goalId);
    const title = `TODO | ${goal.name}`;
    const task = await TaskModel.findById(req.params.taskId).exec();
    const subtasksPromises = task.subtasks.map((s) => TaskModel.findById(s).exec());
    const parents = [];
    await allTaskParents(parents, task._id);
    console.log(task._id);
    console.log(parents);
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

async function addSubTask(req, res) {
    const qstrNikTokenGoalId = `?${queryString.stringify(req.query)}`;
    req.body.parent = req.params.taskId;
    req.body.owner = (await UserService.findByNik(req.query.nik))._id;
    const newTaskPromise = TaskModel.create(req.body);
    TaskModel.findByIdAndUpdate(req.params.taskId, {
        $push: { subtasks: await newTaskPromise },
    }).exec();
    res.redirect(`/todo/task/${req.params.taskId}${qstrNikTokenGoalId}`);
}

async function allTaskParents(arrayForParents, taskId) {
    const task = await TaskModel.findById(taskId).exec();
    arrayForParents.unshift(task);
    if (task.parent !== null) {
        await allTaskParents(arrayForParents, task.parent);
    } else {
        return arrayForParents;
    }
}

module.exports = {
    editTaskView,
    addSubTask,
};
