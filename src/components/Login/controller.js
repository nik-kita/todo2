const queryString = require('querystring');
const UserService = require('../User/service');

function loginView(req, res) {
    res.render('login');
}
function registerView(req, res) {
    res.render('register');
}

function register(req, res) {
    UserService.create(req.body);
    res.redirect('/login');
}

async function login(req, res) {
    const user = await UserService.findByNik(req.body.nik);
    if (user.password === req.body.password) {
        const token = Date.now();
        user.token = token;
        user.save();
        const qParams = queryString.stringify({ token });
        console.log(qParams);
        res.redirect(`/user/${user.nik}?${qParams}`);
    } else {
        res.status(404).json({ sms: 'Please check your nik or password' });
    }
}

module.exports = {
    loginView,
    registerView,
    register,
    login,
};
