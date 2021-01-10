const queryString = require('querystring');
const UserService = require('../User/service');

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
    const goal = await UserService.getGoal(req.params.goalId);
    res.render('editGoal', { qstrNikToken, goal });
}

module.exports = {
    createGoal,
    createGoalView,
    editGoalView,
};
