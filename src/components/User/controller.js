const queryString = require('querystring');

const UserService = require('./service');
const RoleService = require('../Role/service');

async function showUserGoals(req, res) {
    const user = await UserService.findByNik(req.query.nik);
    const qstrNikToken = `?${queryString.stringify({ nik: user.nik, token: user.token })}`;
    res.render('goals', { user, qstrNikToken });
}

function settingsView(req, res) {
    const qstrNikToken = `?${queryString.stringify(req.query)}`;
    res.render('userSettings', {
        qstrNikToken,
    });
}

async function makeAdmin(req, res) {
    RoleService.makeAdmin();
    res.redirect(`/user/account?${queryString.stringify(req.query)}`);
}

module.exports = {
    showUserGoals,
    settingsView,
    makeAdmin,
};
