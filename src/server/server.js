const express = require('express');
const middleware = require('../config/middleware');
const router = require('../config/router');

const app = express();
app.set('port', process.env.PORT || 3000);

middleware.init(app);
router.init(app);

module.exports = app;
