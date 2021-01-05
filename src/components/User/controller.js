const UserService = require('./service');

async function userGoals(req, res) {
    const user = await UserService.findByNik(req.params.nik);
    res.render('userGoals', { user });
}

module.exports = {
    userGoals,
};
