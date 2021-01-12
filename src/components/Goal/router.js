const { Router } = require('express');
const GoalController = require('./controller');
const TaskRouter = require('../Task/router');

const router = Router();

router.get('/', GoalController.createGoalView);
router.post('/', GoalController.createGoal);
router.get('/:goalId', GoalController.editGoalView);
router.post('/:goalId', GoalController.addTask);

module.exports = router;
