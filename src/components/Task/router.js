const { Router } = require('express');
const TaskController = require('./controller');

const router = Router();

router.get('/', TaskController.createTaskView);

module.exports = router;
