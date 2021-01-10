const LoginRouter = require('../components/Login/router');
const UserRouter = require('../components/User/router');
const UserMiddleware = require('../components/User/middleware');
const GoalRouter = require('../components/Goal/router');

module.exports = {
    init(app) {
        app.use('/todo', LoginRouter);
        app.use('/todo', UserMiddleware.checkToken);
        app.use('/todo/user', UserRouter);
        app.use('/todo/goal', GoalRouter);
        app.use('/', (req, res) => res.status(200).json({ sms: 'Make something aweosome!' }));
    },
};
