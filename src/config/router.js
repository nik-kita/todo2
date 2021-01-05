const LoginRouter = require('../components/Login/router');
const UserRouter = require('../components/User/router');

module.exports = {
    init(app) {
        app.use('/', LoginRouter);
        app.use('/user', UserRouter);
        app.use('/', (req, res) => res.status(200).json({ sms: 'Make something aweosome!' }));
    },
};
