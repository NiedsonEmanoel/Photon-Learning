const express = require('express');
const api = express.Router();

api.use('/', require('./rest/rest'));

module.exports = api;