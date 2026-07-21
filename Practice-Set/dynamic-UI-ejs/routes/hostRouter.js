//Core module
const path = require('path')

//External module
const express = require('express')

//Local module
const hostRouter = express.Router();


hostRouter.get('/add-home', (req, res, next) => {
  res.render('addHome', { PageTitle: 'Add Home', currentPage: 'addHome' })
})


const registeredHomes = [];
hostRouter.post('/add-home', (req, res, next) => {
  // registeredHomes.push({ houseName: req.body.houseName, housePrice: req.body.housePrice, houseLocation: req.body.houseLocation, houseRating: req.body.houseRating, houseImage: req.body.houseImage });
  //----------OR DIRECT PASS ALL INFORMATION------------
  registeredHomes.push(req.body);

  console.log(req.body);
  res.render('HomeAdded', { PageTitle: 'home registered successfully', currentPage: 'HomeAdded' })
})


exports.hostRouter = hostRouter;
exports.registeredHomes = registeredHomes;