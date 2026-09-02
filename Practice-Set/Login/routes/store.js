const express = require('express')

const storeRouter = express.Router();
const storeController = require('../Controller/storeController')
storeRouter.get("/", storeController.getHome);

module.exports = {storeRouter};