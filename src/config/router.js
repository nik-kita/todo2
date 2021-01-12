const UserMiddleware = require('../components/User/middleware');
const TaskRouter = require('../components/Task/router');
const LoginRouter = require('../components/Login/router');
const UserRouter = require('../components/User/router');
const GoalRouter = require('../components/Goal/router');

module.exports = {
    init(app) {
        app.use('/todo', LoginRouter);
        app.use('/todo', UserMiddleware.checkToken);
        app.use('/todo/user', UserRouter);
        app.use('/todo/goal', GoalRouter);
        app.use('/todo/task', TaskRouter);
        app.use('/', (req, res) => res.status(200).json({ sms: 'Make something aweosome!' }));
    },
};
