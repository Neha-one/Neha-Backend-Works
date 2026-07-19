//External module
const express = require('express');

// Local module
const path = require('path')
const rootDir = require('../utils/pathUtil')

const contactRouter = express.Router();

contactRouter.get("/contact-us", (req, res, next) => {
  res.sendFile(path.join(rootDir, 'views', 'contact.html'))
})

contactRouter.post("/contact-us", (req, res, next) => {
  console.log(req.body);
  res.sendFile(path.join(rootDir, 'views', 'contactRecieve.html'));
})

module.exports = contactRouter;