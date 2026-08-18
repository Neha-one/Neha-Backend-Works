const express = require('express')
const homeRouter = express.Router();
const storeControll = require('../controllers/storeControll')

homeRouter.get('/', storeControll.getIndex);

homeRouter.get('/home', storeControll.getHome);

homeRouter.get('/booking', storeControll.getBooking);

homeRouter.get('/favorite', storeControll.getFavorite);

homeRouter.get('/home/:skillId', storeControll.getSkillDetails);
homeRouter.post('/favorite', storeControll.postFavorite);

exports.homeRouter = homeRouter; 