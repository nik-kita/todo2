const { Router } = require('express');
const UserMiddleware = require('./middleware');
const UserController = require('./controller');

const router = Router();

router.get('/:nik', UserMiddleware.authCheck, UserController.userGoals);

module.exports = router;
