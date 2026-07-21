//Core module
const path = require('path')

//External module
const express = require('express')

//Local module
const { registeredHomes } = require('./hostRouter');

const userRouter = express.Router();

userRouter.get('/', (req, res, next) => {
  console.log(registeredHomes);
  res.render('home', { registeredHomes: registeredHomes, PageTitle: "airbnb Home ", currentPage: "home" })
})

module.exports = userRouter;  