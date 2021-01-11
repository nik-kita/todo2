const { Router } = require('express');
const TaskMiddleware = require('./middleware');
const TaskController = require('./controller');

const router = Router();

router.use('/', TaskMiddleware.checkOwner);
router.get('/:taskId', TaskController.editTaskView);

module.exports = router;
