const stateRouters = require('./states');
const citiesRouters = require('./cities');
const express = require('express');
const routers = express.Router();

routers.use('/states', stateRouters);
routers.use('/cities', citiesRouters);

module.exports = routers