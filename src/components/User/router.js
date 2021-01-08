const { Router } = require('express');
const UserMiddleware = require('./middleware');
const UserController = require('./controller');
const TaskRouter = require('../Task/router');

const router = Router();

router.get('/:nik', UserMiddleware.checkTokenInQParams, UserController.userGoals);
router.get('/:nik/goal', UserMiddleware.checkTokenInQParams, UserController.addGoalView);
router.post('/:nik/goal', UserMiddleware.checkTokenInBody, UserController.addGoal);
router.get('/:nik/goal/:goalId', UserMiddleware.checkTokenInQParams, UserController.updateGoalView);
router.use('/:nik/goal/:goalId/task', TaskRouter);

module.exports = router;
