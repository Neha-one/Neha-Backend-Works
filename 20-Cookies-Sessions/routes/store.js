const express = require('express');
const storeRouter = express.Router();
const storeController = require('../controller/storeController');

storeRouter.get("/", storeController.getIndex)
storeRouter.get("/home", storeController.getHome)
storeRouter.get('/home/:homeId', storeController.getHomeDetails);
storeRouter.get("/booking", storeController.getBooking)
storeRouter.get("/favorite", storeController.getFavourite)
storeRouter.post("/favorite", storeController.postAddFavourite)

module.exports = { storeRouter };