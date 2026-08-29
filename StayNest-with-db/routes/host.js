const express = require('express');
const hostRouter = express.Router();
const hostController = require("../controller/hostController");

hostRouter.get("/add-home", hostController.getAddHome);
hostRouter.post('/add-home', hostController.postAddHome);
hostRouter.get("/host-home", hostController.getHostHome);
hostRouter.get("/host/edit-home/:homeId", hostController.getEditHome);
hostRouter.post("/host/edit-home", hostController.postEditHome);
hostRouter.post("/host/delete-home/:homeId", hostController.postDeleteHome);
module.exports = { hostRouter };