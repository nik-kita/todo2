const queryString = require('querystring');

const UserService = require('./service');
const RoleService = require('../Role/service');

async function showUserGoals(req, res) {
    const user = await UserService.findByNik(req.query.nik);
    const qstrNikToken = `?${queryString.stringify({ nik: user.nik, token: user.token })}`;
    res.render('goals', { user, qstrNikToken, goalsView: true });
}

async function settingsView(req, res) {
    const user = await UserService.findByNik(req.query.nik);
    const isAdmin = await RoleService.isAdmin(user.nik);
    const qstrNikToken = `?${queryString.stringify(req.query)}`;
    res.render('accountSettings', {
        qstrNikToken,
        accountSettingsView: true,
        isAdmin,
    });
}

async function makeAdmin(req, res) {
    RoleService.makeAdmin(req.query.nik, req.body.sudo);
    res.redirect(`/user/account?${queryString.stringify(req.query)}`);
}

async function showUsers(req, res) {
    const users = await UserService.getAll();
    const qstrNikToken = `?${queryString.stringify(req.query)}`;
    res.render('showUsers', { users, qstrNikToken, layout: './layouts/emptyLayout' });
}

module.exports = {
    showUserGoals,
    settingsView,
    makeAdmin,
    showUsers,
};
