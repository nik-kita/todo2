const queryString = require('querystring');
const UserService = require('./service');

async function userGoals(req, res) {
    const user = await UserService.findByNik(req.params.nik);
    const tokenInQuery = `?${queryString.stringify({ token: user.token })}`;
    res.render('userGoals', { user, tokenInQuery });
}

function addGoalView(req, res) {
    res.render('addGoal', {
        addGoalUrl: `/user/${req.params.nik}/goal`,
        token: req.query.token,
    });
}

function addGoal(req, res) {
    const goal = {
        title: req.body.title,
        description: req.body.description || null,
    };
    UserService.addGoalForUser(req.params.nik, goal);
    res.redirect(`/user/${req.params.nik}?${queryString.stringify({ token: req.body.token })}`);
}

async function updateGoalView(req, res) {
    const goal = (await UserService.findGoalById(req.params.nik, req.params.goalId)).goals[0];
    console.log(goal);
    res.render('singleGoal', { goal });
}

module.exports = {
    userGoals,
    addGoalView,
    addGoal,
    updateGoalView,
};
