const queryString = require('querystring');
const UserService = require('./service');

async function userGoals(req, res) {
    const user = await UserService.findByNik(req.params.nik);
    res.render('userGoals', { user, addGoalButtonUrl: `/user/${user.nik}/goal?${queryString.stringify({ token: user.token })}` });
}

function addGoalView(req, res) {
    res.render('addGoal', { addGoalUrl: `/user/${req.params.nik}/goal`, token: req.query.token });
}

function addGoal(req, res) {
    const goal = {
        title: req.body.title,
        description: req.body.description || null,
    };
    UserService.addGoalForUser(req.params.nik, goal);
    res.redirect(`/user/${req.params.nik}?${queryString.stringify({ token: req.body.token })}`);
}

module.exports = {
    userGoals,
    addGoalView,
    addGoal,
};
