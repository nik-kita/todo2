const queryString = require('querystring');
const UserService = require('../User/service');
const TaskModel = require('../Task/model');

function createGoalView(req, res) {
    const qstrNikToken = `?${queryString.stringify(req.query)}`;
    res.render('createGoal', { qstrNikToken });
}

async function createGoal(req, res) {
    const qstrNikToken = `?${queryString.stringify(req.query)}`;
    const goalId = await UserService.createGoalAndReturnId(req.query.nik, req.body);
    res.redirect(`/todo/goal/${goalId}${qstrNikToken}`);
}

async function editGoalView(req, res) {
    const qstrNikToken = `?${queryString.stringify(req.query)}`;
    const goal = await UserService.getGoal(req.query.nik, req.params.goalId);
    const tasks = [];
    for (t of goal.tasks) {
        tasks.push(await TaskModel.findById(t).exec())
    };
    res.render('editGoal', { qstrNikToken, goal, tasks });
}

function addTask(req, res) {
    const qstrNikToken = `?${queryString.stringify(req.query)}`;
    UserService.addTask(req.params.goalId, req.body);
    res.redirect(`/todo/goal/${req.params.goalId}${qstrNikToken}`);
}

module.exports = {
    createGoal,
    createGoalView,
    editGoalView,
    addTask,
};
