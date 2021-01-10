const UserService = require('./service');

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

module.exports = {
    checkToken,
};
