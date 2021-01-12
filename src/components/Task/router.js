const { Router } = require('express');
const TaskMiddleware = require('./middleware');
const TaskController = require('./controller');

const router = Router();

router.use('/:taskId', TaskMiddleware.checkOwner);
router.get('/:taskId', TaskController.editTaskView);
router.post('/:taskId', TaskController.addSubTask);

module.exports = router;
