const { Router } = require('express');
const UserController = require('./controller');

const router = Router();

router.get('/', UserController.showUserGoals);

module.exports = router;
