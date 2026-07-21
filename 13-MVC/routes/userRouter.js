//External module
const express = require('express')

//Local module
const homeControllers = require('../controllers/homes')

const userRouter = express.Router();

userRouter.get('/', homeControllers.getHome)


module.exports = userRouter;  