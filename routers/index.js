const stateRouters = require('./states');
const citiesRouters = require('./cities');
const userRouters = require('./user');
const authRouter = require('./auth');
const express = require('express');
const routers = express.Router();
const authMiddleware = require('../middlewares/auth');

routers.use('/user', userRouters);
routers.use('/auth', authRouter);
// . . . Rotas abaixo necessitam de authenticação . . .
routers.use(authMiddleware);
routers.use('/states', stateRouters);
routers.use('/cities', citiesRouters);


module.exports = routers