const { Router } = require('express');
const LoginController = require('./controller');

const router = Router();

router.get('/login', LoginController.loginView);
router.get('/register', LoginController.registerView);
router.post('/login', LoginController.login);
router.post('/register', LoginController.register);

module.exports = router;
