//External module
const express = require('express');

//Local module
const homeControllers = require('../controllers/homes')

const hostRouter = express.Router();


hostRouter.get('/add-home', homeControllers.getAddHome)


hostRouter.post('/add-home', homeControllers.postAddHome)

exports.hostRouter = hostRouter;