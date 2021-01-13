const UserService = require('./service');
const RoleService = require('../Role/service');

async function checkToken(req, res, next) {
    const user = await UserService.findByNik(req.query.nik);
    if (user.token === req.query.token) {
        next();
    } else {
        res.status(404).json({ sms: 'You should login!' });
        user.token = null;
        user.save();
    }
}

async function checkAdmin(req, res, next) {
    const user = await UserService.findByNik(req.query.nik);
    const isAdmin = await RoleService.isAdmin(user.nik);
    if (isAdmin) {
        next();
    } else {
        res.status(404).json({ sms: 'You have not admins privelegies for this action!' });
    }
}

module.exports = {
    checkToken,
    checkAdmin,
};
