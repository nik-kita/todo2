const queryString = require('querystring');

const UserService = require('./service');

async function showUserGoals(req, res) {
    const user = await UserService.findByNik(req.query.nik);
    const qstrNikToken = `?${queryString.stringify({ nik: user.nik, token: user.token })}`;
    res.render('goals', { user, qstrNikToken });
}

module.exports = {
    showUserGoals,
};
