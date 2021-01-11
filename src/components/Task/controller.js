const queryString = require('querystring');
const ejs = require('ejs');
const UserService = require('../User/service');
const TaskModel = require('./model');

async function editTaskView(req, res) {
    const qstrNikToken = `?${queryString.stringify(req.query)}`;
    const goal = await UserService.getGoal(req.params.goalId);
    const title = `TODO | ${goal.name}`;
    const parents = [];
    // TODO make recursive function for retrieve all task's parents
}

module.exports = {
    editTaskView,
};
