const queryString = require('querystring');
const UserService = require('../User/service');

function loginView(req, res) {
    res.render('login');
}

function registerView(req, res) {
    res.render('register');
}

async function login(req, res) {
    const user = await UserService.findByNik(req.body.nik);
    if (req.body.password === user.password) {
        const token = Date.now();
        user.token = token;
        user.save();
        const qstrNikToken = `?${queryString.stringify({ nik: user.nik, token })}`;
        res.redirect(`/todo/user${qstrNikToken}`);
    } else {
        res.status(404).json({ sms: 'Please check your nik or password and try again!' });
    }
}

function register(req, res) {
    UserService.create(req.body);
    res.redirect('/todo/login');
}

module.exports = {
    loginView,
    login,
    registerView,
    register,
};
