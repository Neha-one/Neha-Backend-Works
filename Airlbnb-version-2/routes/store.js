const express = require('express');
const storeRoute = express.Router();
const storeController = require('../controller/storeController');

storeRoute.get("/", storeController.getIndex)
storeRoute.get("/home", storeController.getHome)
storeRoute.get("/booking", storeController.getBooking)
storeRoute.get("/favorite", storeController.getFavorite)

module.exports = { storeRoute };