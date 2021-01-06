const queryString = require('querystring');
const UserService = require('./service');

async function checkTokenInQParams(req, res, next) {
    const user = await UserService.findByNik(req.params.nik);
    if (user.token === req.query.token) {
        next();
    } else {
        res.status(404).json({ sms: 'You should login!' });
    }
}

async function checkTokenInBody(req, res, next) {
    const user = await UserService.findByNik(req.params.nik);
    const { token } = req.body;
    if (user.token === token) {
        next();
    } else {
        res.status(404).json({ sms: 'You should login!' });
    }
}

module.exports = {
    checkTokenInQParams,
    checkTokenInBody,
};
