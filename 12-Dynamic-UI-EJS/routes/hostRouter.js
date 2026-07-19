//Core module
const path = require('path')

//External module
const express = require('express')

//Local module
const rootDir = require('../utils/path')

const hostRouter = express.Router();


hostRouter.get('/add-home', (req, res, next) => {
  res.sendFile(path.join(rootDir, 'views', 'addHome.html'))
})

hostRouter.post('/add-home', (req, res, next) => {
  // res.send(req.body)
  console.log(req.body);
  res.sendFile(path.join(rootDir, 'views', 'HomeAdded.html'))
})


module.exports = hostRouter;