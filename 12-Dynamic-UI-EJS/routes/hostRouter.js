//Core module
const path = require('path')

//External module
const express = require('express')

//Local module
const hostRouter = express.Router();


hostRouter.get('/add-home', (req, res, next) => {
  res.render('addHome', { PageTitle: 'Add Home'})
})


const registeredHomes = [];
hostRouter.post('/add-home', (req, res, next) => {
  registeredHomes.push({ houseName: req.body.houseName})
  console.log(req.body.houseName);
  res.render('HomeAdded', { PageTitle: 'home registered successfully' })
})


exports.hostRouter = hostRouter;
exports.registeredHomes = registeredHomes;