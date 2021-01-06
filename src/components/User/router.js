const { Router } = require('express');
const UserMiddleware = require('./middleware');
const UserController = require('./controller');

const router = Router();

router.get('/:nik', UserMiddleware.checkTokenInQParams, UserController.userGoals);
router.get('/:nik/goal', UserMiddleware.checkTokenInQParams, UserController.addGoalView);
router.post('/:nik/goal', UserMiddleware.checkTokenInBody, UserController.addGoal);

module.exports = router;
