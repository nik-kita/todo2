const morgan = require('morgan');
const express = require('express');
const bodyParser = require('body-parser');
const expressEjsLayouts = require('express-ejs-layouts');
const ejs = require('../service/ejs');

module.exports = {
    init(app) {
        app.use(bodyParser.json());
        app.use(bodyParser.urlencoded({ extended: true }));
        app.use(morgan('dev'));
        app.use('/public', express.static(`${__dirname}/../public`));
        app.engine('ejs', ejs);
        app.set('view engine', 'ejs');
        app.set('views', `${__dirname}/../views`);
        app.set('layout', './layouts/layout');
        app.use(expressEjsLayouts);
    },
};
