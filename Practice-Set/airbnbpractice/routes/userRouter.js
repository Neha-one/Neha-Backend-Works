//External module
const express = require('express')

//Local module
const homeControllers = require('../controllers/homes')

const userRouter = express.Router();

userRouter.get('/', homeControllers.getHome)
userRouter.get('/booking', homeControllers.getBooking)
userRouter.get('/favorite', homeControllers.getFavorite)
userRouter.get('/home-list', homeControllers.getHomeList)


module.exports = userRouter;  