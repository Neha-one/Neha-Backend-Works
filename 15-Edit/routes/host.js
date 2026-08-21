const express = require('express')
const hostRouter = express.Router();
const hostController = require('../controllers/hostControll')

hostRouter.get('/add-skill', hostController.getData)

hostRouter.post('/add-skill', hostController.postData);

hostRouter.get('/skill-added', hostController.addedSkills)

hostRouter.get('/host-home', hostController.getHostHome)

exports.hostRouter = hostRouter;
