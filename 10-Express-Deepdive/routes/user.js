//External module
const express = require('express');

//Core module
const path = require('path')

// Local module
const rootDir = require('../utils/pathUtil')

const userRouter = express.Router();

userRouter.get("/", (req, res) => {
  res.sendFile(path.join(rootDir, 'views', 'home.html'))
})

module.exports = userRouter;