const queryString = require('querystring');
const UserService = require('../User/service');
const TaskModel = require('./model');

async function editTaskView(req, res) {
    const qstrNikTokenGoalId = `?${queryString.stringify(req.query)}`;
    console.log(req.params);
    const goal = await UserService.getGoal(req.query.nik, req.query.goalId);
    console.log('----');
    console.log('----');
    console.log('----');
    console.log('----');
    console.log(req.query.nik);
    console.log(req.query.goalId);
    console.log(req.params.taskId);
    console.log(goal);
    const title = `TODO | ${goal.name}`;
    const parentsPromises = [];
    const cursorTask = await TaskModel.findOne({ _id: req.params.taskId }).exec();
    console.log(cursorTask);
    const parents = await allTaskParents([], cursorTask._id);
    console.log(parents);
    res.render('task', {
        title,
        goal,
        qstrNikTokenGoalId,
        parents,
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
