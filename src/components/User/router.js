const { Router } = require('express');
const UserController = require('./controller');

const router = Router();

router.get('/', UserController.showUserGoals);
router.get('/account', UserController.settingsView);
router.post('/admin', UserController.makeAdmin);

module.exports = router;
