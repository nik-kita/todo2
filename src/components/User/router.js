const { Router } = require('express');
const UserController = require('./controller');
const UserMiddleware = require('./middleware');

const router = Router();

router.get('/', UserController.showUserGoals);
router.get('/users', UserMiddleware.checkAdmin, UserController.showUsers);
router.get('/account', UserController.settingsView);
router.post('/admin', UserController.makeAdmin);

module.exports = router;
