const clientsRouters = require('./clients');
const scheduleRouters = require('./schedule');
const userRouters = require('./user');
const authRouter = require('./auth');
const express = require('express');
const routers = express.Router();
const authMiddleware = require('../middlewares/auth');

routers.use('/user', userRouters);
routers.use('/auth', authRouter);
// . . . Rotas abaixo necessitam de authenticação . . .
routers.use(authMiddleware);
routers.use('/clients', clientsRouters);
routers.use('/schedule', scheduleRouters);


module.exports = routers