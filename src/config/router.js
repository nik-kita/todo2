const UserMiddleware = require('../components/User/middleware');
const TaskRouter = require('../components/Task/router');
const LoginRouter = require('../components/Login/router');
const UserRouter = require('../components/User/router');
const GoalRouter = require('../components/Goal/router');

module.exports = {
    init(app) {
        app.use('/', LoginRouter);
        app.use('/', UserMiddleware.checkToken);
        app.use('/user', UserRouter);
        app.use('/goal', GoalRouter);
        app.use('/task', TaskRouter);
        /**
         * @description No results returned mean the object is not found
         * @function
         * @inner
         * @param {callback} middleware - Express middleware.
         */
        app.use((req, res) => {
            res.json({ sms: 'error' });
        });
    },
};
