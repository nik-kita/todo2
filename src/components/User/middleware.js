const UserService = require('./service');

async function authCheck(req, res, next) {
    const user = await UserService.findByNik(req.params.nik);
    if (user.token === req.query.token) {
        next();
    } else {
        res.statue(404).json({ sms: 'You should login!' });
    }
}

module.exports = {
    authCheck,
};
